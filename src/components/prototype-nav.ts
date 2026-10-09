import { html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { Light } from '../base'
import { corePages, flows, changelog, CORE_PAGE_TYPES } from '../config'
import { gridIcon, closeIcon, chevronIcon } from './utils'

const FLOW_KEY = 'wf-flow-index'
const STEP_KEY = 'wf-step-index'
const RING_CLASSES = ['wf-walk-ring', 'ring-4', 'ring-green-500', 'ring-offset-2', 'animate-pulse', 'rounded-lg']

type View = 'root' | 'core' | 'flows' | 'changelog'

/** Right-pointing disclosure chevron for rows that navigate to a sub-view/page — distinct
 *  from chevronIcon's down/up expand-in-place toggle used by the actual dropdown menus. */
function rowChevron() {
  return html`<span class="-rotate-90 inline-block">${chevronIcon(false)}</span>`
}

const TYPE_TAG: Record<string, string> = {
  Added: 'bg-green-100 text-green-800 border-green-300',
  Removed: 'bg-red-100 text-red-800 border-red-300',
  Changed: 'bg-amber-100 text-amber-800 border-amber-300',
  Fixed: 'bg-gray-100 text-gray-700 border-gray-300',
}

/** Tooling chrome — the only place colour outside greyscale is allowed (design-system.md → "Prototype navigator"). */
@customElement('wf-prototype-nav')
export class WfPrototypeNav extends Light {
  @state() private panelOpen = false
  @state() private view: View = 'root'
  @state() private flowIndex: number | null = null
  @state() private stepIndex = 0
  @state() private openTypes = new Set<string>()

  private toggleType(type: string) {
    const next = new Set(this.openTypes)
    if (next.has(type)) next.delete(type)
    else next.add(type)
    this.openTypes = next
  }

  private docClickHandler = (e: MouseEvent) => this.onDocClick(e)
  private keyHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') this.panelOpen = false }

  connectedCallback() {
    super.connectedCallback()
    const fi = sessionStorage.getItem(FLOW_KEY)
    const si = sessionStorage.getItem(STEP_KEY)
    if (fi !== null) this.flowIndex = Number(fi)
    if (si !== null) this.stepIndex = Number(si)
    document.addEventListener('click', this.docClickHandler, true)
    document.addEventListener('keydown', this.keyHandler)
    window.addEventListener('resize', this.resizeHandler)
    setTimeout(() => { this.applyRing(); this.syncBarOffset() }, 60)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener('click', this.docClickHandler, true)
    document.removeEventListener('keydown', this.keyHandler)
    window.removeEventListener('resize', this.resizeHandler)
    document.documentElement.style.setProperty('--wf-bar-h', '0px')
  }

  private resizeHandler = () => this.syncBarOffset()

  updated() {
    this.applyRing()
    this.syncBarOffset()
  }

  /** Keeps the header pushed below the fixed walkthrough bar (and re-stuck under it on
   *  scroll) by measuring the bar's real rendered height into a CSS var every render —
   *  see design-system.md → "Prototype navigator" for why this is a var, not a fixed h-14. */
  private syncBarOffset() {
    const bar = this.querySelector('#wf-walk-bar') as HTMLElement | null
    document.documentElement.style.setProperty('--wf-bar-h', bar ? `${bar.offsetHeight}px` : '0px')
  }

  private currentFile(): string {
    const f = location.pathname.split('/').pop()
    return f && f.length ? f : 'index.html'
  }

  private currentFlow() {
    return this.flowIndex === null ? null : flows[this.flowIndex] ?? null
  }

  private applyRing() {
    document.querySelectorAll('.wf-walk-ring').forEach((el) => el.classList.remove(...RING_CLASSES))
    const flow = this.currentFlow()
    if (!flow) return
    if (this.stepIndex >= flow.steps.length) return
    const step = flow.steps[this.stepIndex]
    if (step.href !== this.currentFile()) return
    const el = document.getElementById(step.targetId)
    if (el) el.classList.add(...RING_CLASSES)
  }

  private onDocClick(e: MouseEvent) {
    const flow = this.currentFlow()
    if (!flow || this.stepIndex >= flow.steps.length) return
    const step = flow.steps[this.stepIndex]
    if (step.href !== this.currentFile()) return
    const target = e.target as HTMLElement
    if (!target?.closest?.(`#${step.targetId}`)) return
    // let the click's default navigation/submit happen either way; just update our own state first.
    if (this.stepIndex === flow.steps.length - 1) {
      // That was the flow's LAST instruction — there's no further step to point at on whatever
      // page/state this click leads to, so the walkthrough is complete. Exit now rather than
      // incrementing stepIndex past the end of the array: render() used to read
      // flow.steps[stepIndex].href unconditionally whenever a flow was active, with no bounds
      // check, which crashed the whole component on the next page once stepIndex overflowed —
      // wiping out not just the walkthrough bar but the floating "Prototype" button too, since
      // both come from this same render(). See PROTOTYPE.md / changelog for this fix.
      this.exitFlow()
    } else {
      this.stepIndex += 1
      sessionStorage.setItem(STEP_KEY, String(this.stepIndex))
    }
  }

  private startFlow(i: number) {
    this.flowIndex = i
    this.stepIndex = 0
    sessionStorage.setItem(FLOW_KEY, String(i))
    sessionStorage.setItem(STEP_KEY, '0')
    this.panelOpen = false
    const firstStep = flows[i].steps[0]
    if (firstStep.href !== this.currentFile()) {
      // The flow's first touchpoint lives on a different page — navigate there now
      // rather than leaving the walkthrough bar showing step 1 with nothing to click.
      location.href = firstStep.href
    } else {
      setTimeout(() => { this.applyRing(); this.syncBarOffset() }, 60)
    }
  }

  private exitFlow() {
    this.flowIndex = null
    sessionStorage.removeItem(FLOW_KEY)
    sessionStorage.removeItem(STEP_KEY)
    this.applyRing()
  }

  private goStep(delta: number) {
    const flow = this.currentFlow()
    if (!flow) return
    const next = this.stepIndex + delta
    // Mirror Previous's step-0 boundary: Next is disabled once you're on the last step (see the
    // render below), so this guard is a backstop, not the primary mechanism — the walkthrough
    // never auto-exits just because you reached the end; Exit is the only way to close it.
    if (next < 0 || next >= flow.steps.length) return
    this.stepIndex = next
    sessionStorage.setItem(STEP_KEY, String(next))
    const step = flow.steps[next]
    if (step.href !== this.currentFile()) {
      location.href = step.href
    } else {
      setTimeout(() => this.applyRing(), 60)
    }
  }

  private openPanel(view: View) {
    this.view = view
    this.panelOpen = true
  }

  render() {
    const flow = this.currentFlow()
    const coreTypeGroups = CORE_PAGE_TYPES
      .map((type) => ({ type, pages: corePages.filter((p) => p.type === type) }))
      .filter((g) => g.pages.length)
    // changelog is authored newest-first with same-date entries kept contiguous, so a simple
    // sequential group-by (not a sort) preserves that order while collapsing the repeated date.
    const changelogByDate: { date: string; entries: typeof changelog }[] = []
    for (const entry of changelog) {
      const last = changelogByDate[changelogByDate.length - 1]
      if (last && last.date === entry.date) last.entries.push(entry)
      else changelogByDate.push({ date: entry.date, entries: [entry] })
    }

    return html`
      ${flow && this.stepIndex < flow.steps.length ? this.renderWalkBar(flow) : ''}

      <button type="button" aria-expanded=${this.panelOpen} aria-label=${this.panelOpen ? 'Close prototype navigator' : 'Open prototype navigator'}
        @click=${() => { this.panelOpen = !this.panelOpen; this.view = 'root' }}
        class="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-gray-800 text-white pl-3 pr-4 py-2.5 text-sm font-medium shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
        ${gridIcon()} Prototype
      </button>

      <div class="fixed inset-0 z-40 bg-gray-900/30 transition-opacity ${this.panelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}"
        @click=${() => (this.panelOpen = false)}></div>

      <div class="fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-white shadow-xl transition-transform duration-300 overflow-y-auto ${this.panelOpen ? 'translate-x-0' : 'translate-x-full'}"
        role="dialog" aria-label="Prototype navigator" aria-hidden=${!this.panelOpen}>
        <div class="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">
          ${this.view !== 'root' ? html`
            <button type="button" @click=${() => (this.view = 'root')} class="inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900">
              <span class="rotate-90 inline-block">${chevronIcon(false)}</span> Back
            </button>` : html`<span class="text-sm font-semibold text-gray-900">Prototype navigator</span>`}
          <button type="button" aria-label="Close" @click=${() => (this.panelOpen = false)} class="p-1 text-gray-500 hover:text-gray-900">${closeIcon()}</button>
        </div>

        ${this.view === 'root' ? html`
          <div class="p-5 space-y-3">
            <button type="button" @click=${() => this.openPanel('core')} class="w-full flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3.5 text-left hover:bg-gray-50">
              <span><span class="block text-sm font-semibold text-gray-900">Core pages</span><span class="block text-xs text-gray-500">${corePages.length} templates across ${coreTypeGroups.length} page types</span></span>
              ${rowChevron()}
            </button>
            <button type="button" @click=${() => this.openPanel('flows')} class="w-full flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3.5 text-left hover:bg-gray-50">
              <span><span class="block text-sm font-semibold text-gray-900">User flows</span><span class="block text-xs text-gray-500">${flows.length} walkthroughs</span></span>
              ${rowChevron()}
            </button>
            <button type="button" @click=${() => this.openPanel('changelog')} class="w-full flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3.5 text-left hover:bg-gray-50">
              <span><span class="block text-sm font-semibold text-gray-900">Change log</span><span class="block text-xs text-gray-500">${changelog.length} ${changelog.length === 1 ? 'entry' : 'entries'}</span></span>
              ${rowChevron()}
            </button>
            <a href="components.html" class="w-full flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3.5 hover:bg-gray-50">
              <span><span class="block text-sm font-semibold text-gray-900">Component List</span><span class="block text-xs text-gray-500">All 20 components at a glance</span></span>
              ${rowChevron()}
            </a>
          </div>` : ''}

        ${this.view === 'core' ? html`
          <div class="p-5">
            <h2 class="text-sm font-semibold text-gray-900 mb-1">Core pages</h2>
            <p class="text-xs text-gray-500 mb-4">Grouped by page template, not by every individual page. Several pages sharing one template (e.g. every news article) collapse into a single group. This build's page types are a starting point, not a fixed list: a genuinely different template gets its own type, but the set stays as small as possible.</p>
            <div class="rounded-lg border border-gray-200 divide-y divide-gray-200">
              ${coreTypeGroups.map((g) => {
                const open = this.openTypes.has(g.type)
                return html`
                <div>
                  <h3>
                    <button type="button" aria-expanded=${open} @click=${() => this.toggleType(g.type)}
                      class="w-full flex items-center justify-between gap-2 px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900">
                      <span class="text-sm font-semibold text-gray-900">${g.type} <span class="font-normal text-gray-400">· ${g.pages.length}</span></span>
                      ${chevronIcon(open)}
                    </button>
                  </h3>
                  ${open ? html`
                    <ul class="space-y-1.5 px-4 pb-3">
                      ${g.pages.map((p) => html`
                        <li>
                          <a href=${p.href} class="flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                            <span>${p.label}</span>
                            ${p.inferred ? html`<span class="shrink-0 rounded-full border border-dashed border-gray-300 px-2 py-0.5 text-[10px] font-medium text-gray-400">Inferred</span>` : ''}
                          </a>
                        </li>`)}
                    </ul>` : ''}
                </div>`
              })}
            </div>
          </div>` : ''}

        ${this.view === 'flows' ? html`
          <div class="p-5 space-y-4">
            <h2 class="text-sm font-semibold text-gray-900">User flows</h2>
            ${flows.map((f, i) => html`
              <div class="rounded-lg border border-gray-200 p-4">
                <h3 class="text-sm font-semibold text-gray-900">${f.name}</h3>
                <p class="mt-1 text-xs text-gray-500">${f.description}</p>
                <button type="button" @click=${() => this.startFlow(i)}
                  class="mt-3 rounded-lg bg-gray-800 px-3.5 py-2 text-xs font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                  Start walkthrough
                </button>
              </div>`)}
          </div>` : ''}

        ${this.view === 'changelog' ? html`
          <div class="p-5 space-y-6">
            <h2 class="text-sm font-semibold text-gray-900">Change log</h2>
            ${changelogByDate.map((group) => html`
              <div>
                <h3 class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">${group.date}</h3>
                <div class="space-y-2">
                  ${group.entries.map((c) => html`
                    <div class="rounded-lg border border-gray-200 p-3.5 flex items-start gap-3">
                      <span class="shrink-0 mt-0.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${TYPE_TAG[c.type]}">${c.type}</span>
                      <p class="text-sm text-gray-700">${c.text}</p>
                    </div>`)}
                </div>
              </div>`)}
          </div>` : ''}
      </div>
    `
  }

  private renderWalkBar(flow: (typeof flows)[number]) {
    const step = flow.steps[this.stepIndex]
    const onThisPage = step.href === this.currentFile()
    const isLastStep = this.stepIndex === flow.steps.length - 1
    return html`
      <div id="wf-walk-bar" class="fixed top-0 inset-x-0 z-[70] bg-gray-900 text-white">
        <div class="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div class="min-w-0">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-400">${flow.name}: step ${this.stepIndex + 1} of ${flow.steps.length}</p>
            <p class="mt-0.5 text-sm truncate">
              ${onThisPage ? step.instruction : html`This step is on <strong>${step.label}</strong>. Use Next to go there.`}
            </p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button type="button" ?disabled=${this.stepIndex === 0} @click=${() => this.goStep(-1)}
              class="rounded-lg bg-white text-gray-900 px-3 py-1.5 text-xs font-medium hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white">
              Previous
            </button>
            <button type="button" ?disabled=${isLastStep} @click=${() => this.goStep(1)}
              class="rounded-lg bg-white text-gray-900 px-3 py-1.5 text-xs font-medium hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white">
              Next
            </button>
            <button type="button" @click=${() => this.exitFlow()}
              class="rounded-lg border border-white/30 px-3 py-1.5 text-xs font-medium hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white">
              Exit
            </button>
          </div>
        </div>
      </div>
    `
  }
}
