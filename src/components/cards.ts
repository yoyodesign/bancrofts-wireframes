import { html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { Light } from '../base'
import { mediaPlaceholder, arrowIcon, chevronIcon, type CardItem } from './utils'

const COLS: Record<number, string> = {
  1: '',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

@customElement('wf-cards')
export class WfCards extends Light {
  @property() heading = ''
  @property({ attribute: false }) items: CardItem[] = []
  /** Optional category filter tabs (listing pages, e.g. News). First entry should be "All". */
  @property({ attribute: false }) filters: string[] = []
  /** Fixed column count for the row — 1, 2, 3, or 4 (tablet always caps at 2, except cols=1).
   *  Set this explicitly to match the block's real item count so the row fills the available
   *  width instead of leaving empty cells (e.g. 2 statically-authored cards is `cols: 2`, not the
   *  4-column default) — see components.md → "Cards".
   *
   *  This is only about a *known, fixed* item list. A **filterable listing** (has `filters`) is
   *  the one case that stays on a FIXED column count sized for its largest expected result rather
   *  than the current item count: a filter tab that narrows the visible set to fewer items should
   *  leave the row's remaining cells empty, not restretch the grid — restretching is what produces
   *  the "one card spanning the full row" bug this model exists to prevent. When a page's real,
   *  static item count doesn't divide evenly into one row, compose multiple <wf-cards> instances
   *  instead (smaller row first) — see design-system.md → interaction catalogue. */
  @property({ type: Number }) cols: 1 | 2 | 3 | 4 = 4
  /** Optional: items per page for a listing that's grown past one screen's worth (e.g. News once
   *  it holds more than a handful of stories). 0 (default) shows the full set, matching every
   *  other wf-cards usage sitewide — this is strictly opt-in so it never changes existing pages. */
  @property({ type: Number, attribute: 'per-page' }) perPage = 0
  @state() private activeFilter = ''
  @state() private currentPage = 1

  connectedCallback() {
    super.connectedCallback()
    this.activeFilter = this.filters[0] || ''
  }

  private selectFilter(f: string) {
    this.activeFilter = f
    this.currentPage = 1
  }

  render() {
    const filtered = this.activeFilter && this.activeFilter !== 'All'
      ? this.items.filter((c) => c.category === this.activeFilter)
      : this.items
    const totalPages = this.perPage > 0 ? Math.max(1, Math.ceil(filtered.length / this.perPage)) : 1
    const page = Math.min(this.currentPage, totalPages)
    const items = this.perPage > 0 ? filtered.slice((page - 1) * this.perPage, page * this.perPage) : filtered
    // Fixed column count regardless of the filtered/visible item count — see the `cols`
    // property doc above. A short result (e.g. one filter tab matching a single item) sits in
    // one normally-sized cell, it doesn't stretch to fill the whole row.
    const cols = COLS[this.cols] ?? COLS[4]
    return html`
      <section>
        <div class="flex flex-col items-start gap-4 mb-6">
          ${this.heading ? html`<h2 class="text-2xl sm:text-3xl font-semibold text-gray-900">${this.heading}</h2>` : ''}
          ${this.filters.length ? html`
            <div class="flex flex-wrap gap-2" role="tablist" aria-label="Filter">
              ${this.filters.map((f) => html`
                <button type="button" role="tab" aria-selected=${this.activeFilter === f}
                  @click=${() => this.selectFilter(f)}
                  class="rounded-full px-3.5 py-1.5 text-xs font-medium border ${this.activeFilter === f ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}">
                  ${f}
                </button>`)}
            </div>` : ''}
        </div>
        ${items.length === 0 ? html`<p class="text-sm text-gray-500">No items match this filter right now.</p>` : html`
          <div class="grid grid-cols-1 ${cols} gap-6">
            ${items.map((c) => {
              const body = html`
                ${c.imageLabel ? mediaPlaceholder(c.imageLabel, 'aspect-video', '', 'rounded-none') : ''}
                <div class="p-5 flex-1 flex flex-col">
                  ${c.category ? html`<span class="text-xs font-medium uppercase tracking-wide text-gray-400">${c.category}</span>` : ''}
                  <h3 class="mt-1 text-lg font-semibold text-gray-900">${c.heading}</h3>
                  ${c.description ? html`<p class="mt-2 text-sm text-gray-600 flex-1">${c.description}</p>` : ''}
                  ${c.href ? html`
                    <span class="mt-4 text-sm font-medium text-gray-900 inline-flex items-center">
                      ${c.linkText || 'View'} ${arrowIcon()}
                    </span>` : ''}
                </div>`
              // No href — a display-only card (e.g. a team/bio card with no real destination
              // page): render a plain div, not a link, and skip the link-affordance row above.
              return c.href
                ? html`<a href=${c.href} id=${c.id || undefined} aria-label=${c.heading}
                    class="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 flex flex-col">${body}</a>`
                : html`<div id=${c.id || undefined}
                    class="rounded-xl border border-gray-200 bg-white overflow-hidden flex flex-col">${body}</div>`
            })}
          </div>`}
        ${this.perPage > 0 && totalPages > 1 ? html`
          <nav aria-label="Pagination" class="mt-8 flex items-center justify-center gap-1.5">
            <button type="button" ?disabled=${page === 1} @click=${() => { this.currentPage = page - 1 }}
              class="rounded-lg px-3 py-2 text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-gray-900">
              <span class="sr-only">Previous page</span>
              <span aria-hidden="true" class="inline-block rotate-90">${chevronIcon(false)}</span>
            </button>
            ${Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => html`
              <button type="button" aria-current=${n === page ? 'page' : undefined}
                @click=${() => { this.currentPage = n }}
                class="min-w-9 rounded-lg px-3 py-2 text-sm font-medium border ${n === page ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-gray-900">
                ${n}
              </button>`)}
            <button type="button" ?disabled=${page === totalPages} @click=${() => { this.currentPage = page + 1 }}
              class="rounded-lg px-3 py-2 text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-gray-900">
              <span class="sr-only">Next page</span>
              <span aria-hidden="true" class="inline-block -rotate-90">${chevronIcon(false)}</span>
            </button>
          </nav>` : ''}
      </section>`
  }
}
