import { html, type TemplateResult } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { Light } from '../base'
import { chevronIcon } from './utils'

export interface CalendarEvent {
  /** ISO date, e.g. '2026-09-17'. */
  date: string
  label: string
  category: string
  /** Optional ISO end date, for multi-day spans (school holidays). Omit, or set equal to `date`,
   *  for a single-day event. A range renders as a shaded band across the days it covers, instead
   *  of a pill — see the class doc below. */
  endDate?: string
}

interface Cell { year: number; month: number; day: number; inMonth: boolean }

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTH_FORMAT = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' })
const DAY_FORMAT = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' })
const AGENDA_DATE_FORMAT = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })

/** A genuine gap in the fixed component kit: nothing renders a real month grid. Added for Calendar,
 *  which needs to bring term dates, Open Mornings, fixtures and school holidays together in one
 *  filterable view rather than a flat card list — see PROTOTYPE.md for this addition flagged back for
 *  the shared kit. Kept in the kit's neutral greyscale palette throughout (no per-category colour
 *  coding): the category filter above the grid is how a category is distinguished, matching the same
 *  filter-tab pattern already used on News. Desktop shows the month grid; below `lg:` a grid this
 *  narrow stops being usable, so mobile falls back to an agenda list of the same filtered events.
 *
 *  Multi-day events (an `endDate` beyond `date`) are a separate case from single-day ones: a school
 *  holiday needs to read as "this whole stretch is off," not as two disconnected point-events at its
 *  boundaries. Those render as a shaded fill across every day cell the range covers, with the label
 *  printed once — on its actual start date, or on the first cell of any grid row it continues into —
 *  rather than repeated in every cell. Single-day events keep the pill treatment. */
@customElement('wf-calendar')
export class WfCalendar extends Light {
  @property() heading = ''
  /** Category filter tabs. First entry should be "All". */
  @property({ attribute: false }) filters: string[] = []
  @property({ attribute: false }) events: CalendarEvent[] = []
  /** Month the calendar opens on, 'YYYY-MM'. Also what the "Today" control returns to. */
  @property({ attribute: 'initial-month' }) initialMonth = ''

  @state() private year = 0
  @state() private month = 0
  @state() private activeFilter = ''
  /** ISO date of the day tapped in the mobile month-shape grid (see `renderGrid`'s day buttons) -
   *  null means nothing selected. Drives a persistent highlight on that day's row in the agenda
   *  list below, not a filter: the agenda still shows the whole month regardless. Clicking the
   *  same day again clears it. */
  @state() private selectedDay: string | null = null

  connectedCallback() {
    super.connectedCallback()
    const [y, m] = this.initialMonth.split('-').map(Number)
    this.year = y || new Date().getFullYear()
    this.month = (m || 1) - 1
    this.activeFilter = this.filters[0] || ''
  }

  private prevMonth() {
    if (this.month === 0) { this.month = 11; this.year -= 1 } else { this.month -= 1 }
  }

  private nextMonth() {
    if (this.month === 11) { this.month = 0; this.year += 1 } else { this.month += 1 }
  }

  private goToInitial() {
    const [y, m] = this.initialMonth.split('-').map(Number)
    this.year = y || this.year
    this.month = (m || 1) - 1
  }

  private buildWeeks(): Cell[][] {
    const firstWeekday = (new Date(this.year, this.month, 1).getDay() + 6) % 7 // 0 = Mon
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate()
    const daysInPrevMonth = new Date(this.year, this.month, 0).getDate()
    const cells: Cell[] = []
    for (let i = 0; i < firstWeekday; i++) {
      const day = daysInPrevMonth - firstWeekday + 1 + i
      const prev = new Date(this.year, this.month - 1, day)
      cells.push({ year: prev.getFullYear(), month: prev.getMonth(), day: prev.getDate(), inMonth: false })
    }
    for (let d = 1; d <= daysInMonth; d++) cells.push({ year: this.year, month: this.month, day: d, inMonth: true })
    while (cells.length < 35 || cells.length % 7 !== 0) {
      const last = cells[cells.length - 1]
      const next = new Date(last.year, last.month, last.day + 1)
      cells.push({ year: next.getFullYear(), month: next.getMonth(), day: next.getDate(), inMonth: false })
    }
    const weeks: Cell[][] = []
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
    return weeks
  }

  private iso(c: { year: number; month: number; day: number }) {
    return `${c.year}-${String(c.month + 1).padStart(2, '0')}-${String(c.day).padStart(2, '0')}`
  }

  private formatRange(startIso: string, endIso: string) {
    return `${DAY_FORMAT.format(new Date(startIso))} – ${DAY_FORMAT.format(new Date(endIso))}`
  }

  /** Category-filtered events split into single-day (grouped by date) and multi-day ranges - the
   *  same split `render()` needs for the grid/agenda, factored out so `selectDay` can resolve a
   *  clicked date to its agenda row without duplicating the filter logic. */
  private filteredEvents() {
    const filtered = this.activeFilter && this.activeFilter !== 'All'
      ? this.events.filter((e) => e.category === this.activeFilter)
      : this.events
    const ranges = filtered.filter((e) => e.endDate && e.endDate !== e.date) as (CalendarEvent & { endDate: string })[]
    const singleEvents = filtered.filter((e) => !e.endDate || e.endDate === e.date)
    const byDate = new Map<string, CalendarEvent[]>()
    for (const e of singleEvents) {
      const list = byDate.get(e.date) || []
      list.push(e)
      byDate.set(e.date, list)
    }
    return { ranges, byDate }
  }

  /** A clicked date maps to its own agenda row if it has single-day events, or to the row of
   *  whichever holiday range it falls inside (a range gets one row, not one per day it spans). */
  private resolveAgendaDate(iso: string, byDate: Map<string, CalendarEvent[]>, ranges: (CalendarEvent & { endDate: string })[]): string | null {
    if (byDate.has(iso)) return iso
    return ranges.find((r) => iso >= r.date && iso <= r.endDate)?.date ?? null
  }

  private selectDay(iso: string) {
    const next = this.selectedDay === iso ? null : iso
    this.selectedDay = next
    if (!next) return
    const { ranges, byDate } = this.filteredEvents()
    const targetDate = this.resolveAgendaDate(next, byDate, ranges)
    if (!targetDate) return
    this.updateComplete.then(() => {
      this.querySelector(`#wf-cal-agenda-${targetDate}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }

  render() {
    const { ranges, byDate } = this.filteredEvents()
    const selectedTargetDate = this.selectedDay ? this.resolveAgendaDate(this.selectedDay, byDate, ranges) : null

    const weeks = this.buildWeeks()
    const monthLabel = MONTH_FORMAT.format(new Date(this.year, this.month, 1))
    const monthPrefix = `${this.year}-${String(this.month + 1).padStart(2, '0')}`
    const today = new Date()
    const todayIso = this.iso({ year: today.getFullYear(), month: today.getMonth(), day: today.getDate() })

    // Mobile agenda: single-day events grouped per date, plus one collapsed row per holiday range
    // that overlaps this month — sorted together so a holiday appears in date order alongside events.
    type AgendaItem = { sortKey: string; node: TemplateResult }
    const agendaItems: AgendaItem[] = [...byDate.keys()]
      .filter((d) => d.startsWith(monthPrefix))
      .sort()
      .map((d) => {
        const selected = d === selectedTargetDate
        return {
          sortKey: d,
          node: html`
            <div id="wf-cal-agenda-${d}" class="p-4 scroll-mt-24 transition-colors ${selected ? 'bg-gray-100' : ''}">
              <p class="text-xs font-semibold uppercase tracking-wide text-gray-500">${AGENDA_DATE_FORMAT.format(new Date(d))}</p>
              <ul class="mt-2 space-y-1.5">
                ${(byDate.get(d) || []).map((e) => html`
                  <li class="text-sm text-gray-900">${e.label} <span class="text-gray-500">- ${e.category}</span></li>`)}
              </ul>
            </div>`,
        }
      })
    for (const r of ranges) {
      const monthStart = `${monthPrefix}-01`
      const monthEnd = `${monthPrefix}-31`
      if (r.endDate < monthStart || r.date > monthEnd) continue
      const selected = r.date === selectedTargetDate
      agendaItems.push({
        sortKey: r.date,
        node: html`
          <div id="wf-cal-agenda-${r.date}" class="p-4 scroll-mt-24 transition-colors ${selected ? 'bg-gray-100' : 'bg-gray-50'}">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500">${this.formatRange(r.date, r.endDate)}</p>
            <p class="mt-2 text-sm text-gray-900">${r.label} <span class="text-gray-500">- ${r.category}</span></p>
          </div>`,
      })
    }
    agendaItems.sort((a, b) => a.sortKey.localeCompare(b.sortKey))

    return html`
      <section>
        ${this.heading ? html`<h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">${this.heading}</h2>` : ''}

        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          ${this.filters.length ? html`
            <!-- Mobile: a dropdown - at phone width the pill row wraps to two or three lines and
                 reads as visually noisy sitting right above the month-shape grid; a single select
                 collapses every category into one control without losing any of them. -->
            <div class="lg:hidden relative">
              <label class="sr-only" for="wf-calendar-filter">Filter by category</label>
              <!-- appearance-none drops the browser's own native arrow, which renders flush against
                   the border ignoring the select's right padding (that's the "chevron has no right
                   padding" bug) - swapped for the kit's own chevronIcon, positioned to match. -->
              <select id="wf-calendar-filter" .value=${this.activeFilter}
                @change=${(e: Event) => { this.activeFilter = (e.target as HTMLSelectElement).value }}
                class="w-full appearance-none rounded-lg border border-gray-300 pl-3.5 pr-9 py-2.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900">
                ${this.filters.map((f) => html`<option value=${f} ?selected=${this.activeFilter === f}>${f}</option>`)}
              </select>
              <span aria-hidden="true" class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">${chevronIcon(false)}</span>
            </div>
            <!-- Desktop: the original pill tabs - there's room here, and pills give at-a-glance
                 category visibility (and one-click switching) that a dropdown can't. -->
            <div class="hidden lg:flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
              ${this.filters.map((f) => html`
                <button type="button" role="tab" aria-selected=${this.activeFilter === f}
                  @click=${() => { this.activeFilter = f }}
                  class="rounded-full px-3.5 py-1.5 text-xs font-medium border ${this.activeFilter === f ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}">
                  ${f}
                </button>`)}
            </div>` : html`<div></div>`}

          <div class="flex items-center gap-2">
            <!-- flex items-center justify-center, not the default inline-block layout the span
                 used to rely on: an inline SVG reserves descender space beneath itself, which both
                 pushed the icon a few px off-centre inside the button AND inflated the button
                 taller than the "Today" text button next to it. flex removes both. -->
            <button type="button" @click=${() => this.prevMonth()} aria-label="Previous month"
              class="flex items-center justify-center rounded-lg p-2 border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900">
              <span aria-hidden="true" class="rotate-90">${chevronIcon(false)}</span>
            </button>
            <p class="w-36 text-center text-sm font-semibold text-gray-900">${monthLabel}</p>
            <button type="button" @click=${() => this.nextMonth()} aria-label="Next month"
              class="flex items-center justify-center rounded-lg p-2 border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900">
              <span aria-hidden="true" class="-rotate-90">${chevronIcon(false)}</span>
            </button>
            <button type="button" @click=${() => this.goToInitial()}
              class="rounded-lg px-3 py-2 text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900">
              Today
            </button>
          </div>
        </div>

        <!-- Desktop: real month grid. A 7-column grid this narrow stops being usable on a phone,
             so it's desktop-only; mobile gets the agenda list below instead. -->
        <div class="hidden lg:block rounded-xl border border-gray-200 overflow-hidden">
          <table class="w-full border-collapse table-fixed">
            <thead>
              <tr class="bg-gray-800 text-white">
                ${WEEKDAYS.map((w) => html`<th scope="col" class="px-3 py-2.5 text-xs font-semibold uppercase tracking-wide">${w}</th>`)}
              </tr>
            </thead>
            <tbody>
              ${weeks.map((week) => html`
                <tr class="divide-x divide-gray-200 border-t border-gray-200">
                  ${week.map((cell, ci) => {
                    const iso = this.iso(cell)
                    const dayEvents = byDate.get(iso) || []
                    const visible = dayEvents.slice(0, 3)
                    const extra = dayEvents.length - visible.length
                    const activeRange = ranges.find((r) => iso >= r.date && iso <= r.endDate)
                    const showRangeLabel = !!activeRange && (iso === activeRange.date || ci === 0)
                    return html`
                      <td class="align-top p-2 h-28 ${activeRange ? 'bg-gray-100' : cell.inMonth ? 'bg-white' : 'bg-gray-50'}">
                        <p class="text-xs font-medium ${cell.inMonth ? 'text-gray-900' : 'text-gray-300'}">${cell.day}</p>
                        ${showRangeLabel ? html`<p class="mt-0.5 truncate text-[11px] font-semibold text-gray-600" title=${activeRange!.label}>${activeRange!.label}</p>` : ''}
                        <div class="mt-1 space-y-1">
                          ${visible.map((e) => html`
                            <p class="truncate rounded-full bg-white border border-gray-300 px-2 py-0.5 text-[11px] text-gray-700" title=${e.label}>${e.label}</p>`)}
                          ${extra > 0 ? html`<p class="text-[11px] text-gray-500">+${extra} more</p>` : ''}
                        </div>
                      </td>`
                  })}
                </tr>`)}
            </tbody>
          </table>
        </div>

        <!-- Mobile: compact month-shape overview - day numbers and a dot for event days, no pills
             or labels at this size - sitting above the agenda list. Gives back the "this is a
             month" shape (weeks, weekends, empty stretches) that a flat list loses on its own; the
             agenda below is still where events are actually read, this is deliberately not
             interactive (no tap-to-filter) to keep it a quick overview, not a second navigation. -->
        <div class="lg:hidden mb-4 rounded-xl border border-gray-200 p-3">
          <div class="grid grid-cols-7 gap-y-1 text-center">
            ${WEEKDAYS.map((w) => html`<div class="text-[11px] font-medium text-gray-400">${w[0]}</div>`)}
            ${weeks.flat().map((cell) => {
              const iso = this.iso(cell)
              const hasEvent = byDate.has(iso) || ranges.some((r) => iso >= r.date && iso <= r.endDate)
              const isToday = iso === todayIso
              const dayNumber = html`
                <span class="flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium ${isToday ? 'bg-gray-800 text-white' : cell.inMonth ? 'text-gray-900' : 'text-gray-300'}">
                  ${cell.day}
                </span>
                <span class="w-1 h-1 rounded-full ${hasEvent ? 'bg-gray-500' : 'bg-transparent'}"></span>`
              // Only in-month days with an event are clickable - an out-of-month lead/trail day's
              // event lives in a different month's agenda, not the one currently rendered below.
              return hasEvent && cell.inMonth
                ? html`
                  <button type="button" @click=${() => this.selectDay(iso)}
                    aria-label="${AGENDA_DATE_FORMAT.format(new Date(iso))}, jump to this day's events"
                    class="flex flex-col items-center gap-1 py-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900">
                    ${dayNumber}
                  </button>`
                : html`<div class="flex flex-col items-center gap-1 py-1">${dayNumber}</div>`
            })}
          </div>
        </div>

        <!-- Mobile: agenda list, same filtered events (and collapsed holiday ranges), by date. -->
        <div class="lg:hidden divide-y divide-gray-200 rounded-xl border border-gray-200">
          ${agendaItems.length === 0
            ? html`<p class="p-5 text-sm text-gray-500">No events this month for this filter.</p>`
            : agendaItems.map((item) => item.node)}
        </div>
      </section>`
  }
}
