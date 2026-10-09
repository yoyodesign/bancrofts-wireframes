import { html, type PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { Light } from '../base'
import { primaryNav, siteName, headerCta, headerUtilityLinks } from '../config'
import { hamburgerIcon, closeIcon, chevronIcon, arrowIcon } from './utils'

/** Project-specific defect fix (flagged back to the skill's shared kit — see PROTOTYPE.md): the
 *  shipped component hardcoded a "Shop"/"Donate" CTA pair pointing at a previous project's own
 *  domain instead of reading them from config. Header CTA now comes from `headerCta` in config.ts.
 *
 *  Navigation pattern rebuild (per the confirmed brief, inspired by uppingham.co.uk): rather than a
 *  persistent desktop dropdown/mega-menu bar, the whole primary nav lives behind a single hamburger
 *  at every breakpoint, opening a full-page takeover. The takeover's internal layout is itself
 *  responsive, driven by two independent pieces of state:
 *
 *  - **Narrow viewports** (`activeSection`, `lg:hidden` branch) — drill-down, not expand-in-place:
 *    tapping a section with children navigates to a dedicated sub-view for just that section (with
 *    its own Back row), rather than expanding an accordion in place. This caps every screen's height
 *    at one section's worth of links regardless of how many children it has (Admissions has 8, About
 *    has 10) — an accordion can't guarantee that, since an expanded section still pushes every
 *    sibling section down, and two expanded at once compounds it further. See the insights audit's
 *    Miller's Law finding this build carries forward: never show more than one focused set of
 *    options at a time.
 *  - **Wide viewports** (`desktopSection`, `hidden lg:grid` branch, see `renderDesktopColumns`) — a
 *    two-column layout: primary sections stay visible in a left column, and selecting one swaps a
 *    right-hand column's content in place, so the reviewer can move between areas of the site
 *    without losing the section list the way the narrow drill-down does. There's room here that a
 *    phone-width screen doesn't have, so the height-cap concern above doesn't apply the same way. */
@customElement('wf-header-nav')
export class WfHeaderNav extends Light {
  /** slug of the current page's top-level nav section, for active-state styling */
  @property() active = ''
  /** Stripped-down header — brand + a single "Return to homepage" link, no nav/CTA/hamburger.
   *  Used on tooling pages (Component List) that aren't part of the site's own IA. */
  @property({ type: Boolean }) minimal = false
  @state() private navOpen = false
  /** Mobile/narrow-viewport drill-down state: null = root section list; a slug = drilled into
   *  that section's sub-view (see the `lg:hidden` render branch). */
  @state() private activeSection: string | null = null
  /** Wide-viewport two-column state: which section's sub-pages show in the right-hand column
   *  (see the `hidden lg:grid` render branch). Independent of `activeSection` — the left column
   *  never disappears at this width, so there's no "root vs. drilled-in" state to track, just
   *  which section is currently selected. */
  @state() private desktopSection: string | null = null
  /** Which utility link (Parent/Pupil/Staff Portal) currently has its sub-links expanded - a
   *  push-down accordion (see `renderUtilityList`), same pattern as wf-accordion elsewhere in the
   *  kit. Single slot, not a Set: only one open at a time, matching wf-accordion's own default
   *  (non-multi-open) behaviour. */
  @state() private openUtility: string | null = null

  /** display:contents (not the base class's default display:block) — the host must not
   *  generate its own box, or it becomes <header>'s sticky containing block. Since this
   *  wrapper is exactly as tall as <header> itself, that leaves zero room to stick and the
   *  header just scrolls away immediately. With display:contents, <header> is boxed directly
   *  by <body> (tall, full page height), giving position:sticky real room to work. */
  connectedCallback() {
    this.style.display = 'contents'
    super.connectedCallback()
    this._onKeydown = this._onKeydown.bind(this)
    document.addEventListener('keydown', this._onKeydown)
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this._onKeydown)
    // In case this ever unmounts while the nav is open — leaving the page permanently
    // unscrollable behind it would be a much worse bug than the one this class fixes.
    document.documentElement.style.overflow = ''
    super.disconnectedCallback()
  }

  private _onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.navOpen) this.closeNav()
  }

  /** Lock the underlying page's own scroll while the takeover is open — it's a fixed-position
   *  panel over the real page, and without this the page behind it can still scroll (invisibly,
   *  since it's covered), which is disorienting once the panel closes and you're somewhere you
   *  didn't scroll to. The panel's own content still scrolls fine: its `overflow-y-auto` dialog
   *  div is a separate scroll container from `<html>`, so locking html's scroll here doesn't
   *  touch it. Applies at every viewport width — mobile drill-down and desktop two-column both
   *  render inside the same fixed panel. */
  updated(changed: PropertyValues) {
    if (changed.has('navOpen')) {
      document.documentElement.style.overflow = this.navOpen ? 'hidden' : ''
    }
  }

  private toggleNav() {
    this.navOpen = !this.navOpen
    // Always reopen with nothing selected — mobile at the root section list, desktop with an
    // empty right column — rather than assuming the user wants whichever section the current
    // page happens to belong to. Nothing is "active" until the user actually picks something.
    if (this.navOpen) {
      this.activeSection = null
      this.desktopSection = null
    }
  }

  private closeNav() {
    this.navOpen = false
  }

  private openSection(slug: string) {
    this.activeSection = slug
    this.scrollPanelToTop()
  }

  private backToRoot() {
    this.activeSection = null
    this.scrollPanelToTop()
  }

  private selectDesktopSection(slug: string) {
    this.desktopSection = slug
  }

  private toggleUtility(label: string) {
    this.openUtility = this.openUtility === label ? null : label
  }

  /** The takeover panel is a scroll container of its own; without this, drilling into a section
   *  (or back out of one) keeps whatever scroll position the previous view was left at, which can
   *  open a section already scrolled past its own heading and Back row. */
  private scrollPanelToTop() {
    this.updateComplete.then(() => {
      const panel = this.querySelector('[role="dialog"][aria-label="Site navigation"]')
      if (panel) panel.scrollTop = 0
    })
  }

  /** Right-pointing disclosure chevron for a row that navigates to a sub-view — distinct from
   *  chevronIcon's own up/down expand-in-place rotation, which this component no longer uses. */
  private rowChevron() {
    return html`<span class="-rotate-90 inline-block">${chevronIcon(false)}</span>`
  }

  private backChevron() {
    return html`<span class="rotate-90 inline-block">${chevronIcon(false)}</span>`
  }

  /** Shared by the mobile root list and the desktop rail (see render()) — Contact stays a plain
   *  link; Parent/Pupil/Staff Portal each expand in place to their real sub-systems (see
   *  `headerUtilityLinks` in config.ts), same push-down pattern as wf-accordion elsewhere in the
   *  kit (button + chevronIcon, content in normal flow beneath it) rather than a popover — no
   *  viewport-edge positioning to work around, since expanding one just grows this list, and
   *  whatever it sits next to (the fixed rail's promo card, or the mobile root list below it)
   *  isn't affected. Same vertical, stacked layout at every width the takeover uses this in. */
  private renderUtilityList() {
    return html`
      <ul class="w-44 space-y-3 text-sm text-gray-500">
        ${headerUtilityLinks.map((l) => {
          if (!l.children?.length) {
            return html`<li><a href=${l.href} @click=${() => this.closeNav()} class="hover:text-gray-900">${l.label}</a></li>`
          }
          const open = this.openUtility === l.label
          return html`
            <li>
              <button type="button" aria-expanded=${open} @click=${() => this.toggleUtility(l.label)}
                class="w-full flex items-center justify-between gap-1 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 rounded-md">
                ${l.label} ${chevronIcon(open)}
              </button>
              ${open ? html`
                <ul class="mt-2 space-y-2 border-l border-gray-200 pl-3">
                  ${l.children.map((c) => html`
                    <li><a href=${c.href} @click=${() => this.closeNav()} class="block text-gray-600 hover:text-gray-900">${c.label}</a></li>`)}
                </ul>` : ''}
            </li>`
        })}
      </ul>`
  }

  private renderRootList() {
    return html`
      <ul class="divide-y divide-gray-200 border-b border-gray-200">
        ${primaryNav.map((item) => {
          const isActive = this.active === item.slug
          if (!item.children?.length) {
            return html`
              <li>
                <a href=${item.href} @click=${() => this.closeNav()}
                  class="flex items-center py-4 sm:py-5 text-xl sm:text-2xl font-semibold ${isActive ? 'text-gray-900' : 'text-gray-800 hover:text-gray-900'}">
                  ${item.label}
                </a>
              </li>`
          }
          return html`
            <li>
              <button type="button" @click=${() => this.openSection(item.slug)}
                class="w-full flex items-center justify-between gap-4 py-4 sm:py-5 text-xl sm:text-2xl font-semibold text-left ${isActive ? 'text-gray-900' : 'text-gray-800 hover:text-gray-900'} focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 rounded-md">
                ${item.label}
                ${this.rowChevron()}
              </button>
            </li>`
        })}
      </ul>

      <div class="mt-8">${this.renderUtilityList()}</div>`
  }

  private renderSectionList(slug: string) {
    const item = primaryNav.find((i) => i.slug === slug)
    if (!item?.children?.length) return ''
    return html`
      <button type="button" @click=${() => this.backToRoot()}
        class="inline-flex items-center gap-1 -ml-1 mb-4 sm:mb-6 py-2 pl-1 pr-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900">
        ${this.backChevron()} Back
      </button>
      <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">${item.label}</h2>
      <ul class="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
        ${item.children.map((child) => html`
          <li>
            <a href=${child.href} @click=${() => this.closeNav()}
              class="block py-3 sm:py-3.5 text-base sm:text-lg font-medium text-gray-900 hover:text-gray-600">
              ${child.label}
            </a>
          </li>`)}
      </ul>`
  }

  /** Wide-viewport two-column takeover (inspired by uppingham.co.uk): primary sections on the
   *  left, the selected section's sub-pages on the right, both visible together — selecting a
   *  different section on the left just swaps the right column's content in place, rather than
   *  navigating away from the section list the way the mobile drill-down does. */
  /** Static, not tied to `desktopSection` — the same promo shows regardless of which section is
   *  selected (or none). One CMS-managed slot is far simpler to keep current than a variant per
   *  section, and content that's relevant no matter what someone's browsing (an introduction from
   *  the Head) suits a persistent slot better than section-specific content would. Positioned
   *  independently of the two-column grid (see the fixed top-right wrapper in `render()`) so it
   *  tracks the header's "Book a Visit" + menu toggle group above it at every viewport width,
   *  rather than sitting wherever the grid's own column widths happen to land it. Links through to
   *  a real page rather than opening a video modal in the nav itself, keeping this simple and
   *  reusing the video pattern already built for wf-media on that page. */
  private renderPromo() {
    return html`
      <a href="about-welcome.html" @click=${() => this.closeNav()}
        class="block max-w-sm rounded-xl border border-gray-200 overflow-hidden hover:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2">
        <div class="relative aspect-video bg-gray-200 flex items-center justify-center overflow-hidden">
          <span aria-hidden="true" class="flex items-center justify-center h-14 w-14 rounded-full bg-white/90 text-gray-800">
            <svg class="w-6 h-6 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </span>
        </div>
        <div class="p-5">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-400">Watch</p>
          <h3 class="mt-1 text-lg font-semibold text-gray-900">Get to know Alex</h3>
          <p class="mt-2 text-sm text-gray-600">An introduction to Bancroft’s from our Head, in their own words.</p>
          <span class="mt-4 inline-flex items-center text-sm font-medium text-gray-900">Watch the film ${arrowIcon()}</span>
        </div>
      </a>`
  }

  private renderDesktopColumns() {
    const selected = primaryNav.find((i) => i.slug === this.desktopSection)
    return html`
      <div class="grid grid-cols-[280px_320px] gap-16">
        <ul>
          ${primaryNav.map((item) => {
            const isSelected = this.desktopSection === item.slug
            if (!item.children?.length) {
              return html`
                <li>
                  <a href=${item.href} @click=${() => this.closeNav()}
                    class="block rounded-lg px-3.5 py-3 text-lg font-semibold ${this.active === item.slug ? 'text-gray-900' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}">
                    ${item.label}
                  </a>
                </li>`
            }
            return html`
              <li>
                <button type="button" aria-current=${isSelected ? 'true' : undefined}
                  @click=${() => this.selectDesktopSection(item.slug)}
                  class="w-full flex items-center justify-between gap-3 rounded-lg px-3.5 py-3 text-lg font-semibold text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 ${isSelected ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}">
                  ${item.label}
                  ${this.rowChevron()}
                </button>
              </li>`
          })}
        </ul>
        <div>
          ${selected?.children?.length ? html`
            <ul class="space-y-[22px]">
              ${selected.children.map((child) => html`
                <li>
                  <a href=${child.href} @click=${() => this.closeNav()}
                    class="text-base font-medium text-gray-900 hover:text-gray-600">
                    ${child.label}
                  </a>
                </li>`)}
            </ul>` : ''}
        </div>
      </div>`
  }

  render() {
    if (this.minimal) {
      return html`
        <header class="sticky mt-[var(--wf-bar-h)] top-[var(--wf-bar-h)] z-40 border-b border-gray-200 bg-white">
          <div class="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
            <span class="text-base font-semibold text-gray-900">${siteName}: Component List</span>
            <a href="index.html"
               class="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2">Return to homepage</a>
          </div>
        </header>`
    }
    return html`
      <header class="sticky mt-[var(--wf-bar-h)] top-[var(--wf-bar-h)] z-50 border-b border-gray-200 bg-white">
        <div class="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <a href="index.html" class="text-base sm:text-lg font-semibold text-gray-900 truncate">${siteName}</a>

          <!-- Pinned CTA + menu toggle: always rendered here, in this exact position and grouping,
               whether the takeover below is open or closed — neither ever relocates into the panel. -->
          <div class="flex items-center gap-5 shrink-0">
            <a href=${headerCta.href} id="cta-header-primary"
               class="shrink-0 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2">
              ${headerCta.label}
            </a>
            <button type="button" aria-label=${this.navOpen ? 'Close menu' : 'Open menu'} aria-expanded=${this.navOpen} aria-haspopup="dialog"
              class="flex items-center justify-center gap-1.5 w-20 py-2 -mr-2 text-gray-700 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              @click=${() => this.toggleNav()}>
              ${this.navOpen ? closeIcon() : hamburgerIcon()}
              <span class="text-sm font-medium">${this.navOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </header>

      ${this.navOpen ? html`
        <div role="dialog" aria-modal="true" aria-label="Site navigation"
          class="fixed inset-x-0 bottom-0 top-[calc(var(--wf-bar-h)+4rem)] z-40 bg-white overflow-y-auto">
          <div class="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <!-- Narrow viewports: single-column drill-down (root list, or a section's sub-list
                 with a Back row) — there isn't room for a second column of sub-page labels. -->
            <nav aria-label="Primary" class="py-6 sm:py-10 max-w-3xl lg:hidden">
              ${this.activeSection === null ? this.renderRootList() : this.renderSectionList(this.activeSection)}
            </nav>
            <!-- Wide viewports: two-column layout (see renderDesktopColumns) — sections stay
                 visible on the left while the right column shows whichever one is selected. -->
            <nav aria-label="Primary" class="hidden lg:block py-10">
              ${this.renderDesktopColumns()}
            </nav>
          </div>
        </div>
        <!-- Anchored to the viewport's top-right corner (independent fixed positioning, not part
             of the dialog's own scroll), directly under the header's "Book a Visit" + menu toggle
             group above it — same right-aligned container as the header, so it tracks that group
             at every viewport width rather than drifting with the grid's own column widths. Wide
             viewports only, matching the two-column layout it belongs to. Promo card and the
             Contact/Portal utility rail sit side by side here, both top-aligned — a persistent
             "quick links" rail (inspired by uppingham.co.uk), rather than the previous version's
             separate bar pinned to the very bottom of the viewport. -->
        <div class="hidden lg:block fixed inset-x-0 top-[calc(var(--wf-bar-h)+4rem)] z-40 pointer-events-none">
          <div class="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 pt-10 flex items-start justify-end gap-16">
            <div class="pointer-events-auto">${this.renderPromo()}</div>
            <!-- -mr-2 matches the header toggle button's own -mr-2, so the rail's right edge
                 lines up exactly with the toggle's right edge, not just the container's padding. -->
            <div class="pointer-events-auto -mr-2">${this.renderUtilityList()}</div>
          </div>
        </div>` : ''}
    `
  }
}
