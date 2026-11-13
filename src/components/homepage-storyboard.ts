import { html, type TemplateResult } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { Light } from '../base'
import { arrowIcon, videoPlaceholder } from './utils'

interface Beat { id: string; label: string; caption: string }

const BEATS: Beat[] = [
  { id: 'beat-gate', label: 'The Gate', caption: 'Static shot. Front tower, formal and still.' },
  { id: 'beat-archway', label: 'The Archway', caption: 'A dark passage through the tower — the quad glows ahead as a rectangle of light.' },
  { id: 'beat-credibility', label: 'Credibility', caption: 'Drone orbit begins, facing back toward the tower and fountain.' },
  { id: 'beat-welcome', label: 'The Welcome', caption: 'Orbit continues over the open lawn and the quad’s central tree.' },
  { id: 'beat-invitation', label: 'The Invitation', caption: 'Orbit continues toward the cloister and chapel walkway, warmest light of the sequence.' },
]

/** LOCAL ONLY — not yet pushed to the deployed site, per the brief.
 *
 *  Bespoke, one-off homepage replacement: a scroll-driven fly-through of the school
 *  building (front gate -> archway -> three drone orbits of the quad), prototyped here
 *  as closely to the real mechanic as a static wireframe reasonably can — one
 *  full-viewport scene pinned in place while scroll advances which beat is showing,
 *  rather than five sections stacked in the normal document flow. Content-and-structure
 *  wireframe, not a visual mockup: scenes are plain grey placeholders with a caption
 *  describing the intended camera move, no branding, no photography.
 *
 *  THE MECHANIC — sticky + scroll-position, not scroll-jacking: a tall track
 *  (BEATS.length * 100svh) holds one `position: sticky` viewport-height stage. The
 *  five beats are absolutely-stacked panels inside that stage, crossfaded by opacity
 *  as a scroll listener computes progress through the track and maps it to a beat
 *  index. This keeps scrolling 100% native (wheel, trackpad, touch, keyboard, screen
 *  readers all work exactly as they already do) — a true scroll-jacking
 *  implementation would fight all of those for a marginal fidelity gain. Once the
 *  user scrolls past the track's own height, the sticky stage releases on its own
 *  (inherent to `position: sticky` — nothing bespoke needed) and normal scroll
 *  carries on down into the footer.
 *
 *  Deliberately doesn't compose from the shared wf-* kit: this is a one-off
 *  experience allowed its own layout, free of the rest of the kit's conventions.
 *  page-body.ts renders this directly in place of the usual hero/blocks loop when
 *  page is 'homepage'.
 *
 *  Every CTA id an existing user-journey walkthrough depends on (cta-home-prep,
 *  cta-home-senior, cta-home-sixth-form, cta-home-school-life-promo,
 *  cta-home-news-article) is kept on its natural equivalent element here, so those
 *  journeys still work unchanged. */
@customElement('wf-homepage-storyboard')
export class WfHomepageStoryboard extends Light {
  @state() private activeBeat = 0
  @state() private welcomePlaying = false
  /** False once the track has fully scrolled past the header line and the real
   *  footer has taken over the viewport — the rail has nothing left to jump to at
   *  that point, so it's hidden rather than left floating over unrelated content. */
  @state() private showRail = true

  firstUpdated() {
    window.addEventListener('scroll', this.onScroll, { passive: true })
    this.onScroll()
    // wf-site-footer's own <footer> carries mt-20, invisible on every other page since
    // it's filled with the same pale page background above and below it. This scene uses
    // a visibly darker bg-gray-200, so that 80px reads as a stray lighter "bar" between
    // the scene and the footer. <footer> is a sibling of <main> in the page shell, not a
    // descendant of it - <main>'s own bottom padding sits between this component and the
    // footer and blocks normal margin collapsing from ever reaching it, so nothing this
    // component renders inside <main> can cover that margin. Zeroing it directly, scoped
    // to this component's own lifecycle, is the only way to actually reach it.
    const footerEl = document.querySelector('footer')
    if (footerEl) footerEl.style.marginTop = '0'
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('scroll', this.onScroll)
    const footerEl = document.querySelector('footer')
    if (footerEl) footerEl.style.marginTop = ''
  }

  private track(): HTMLElement | null {
    return this.querySelector('#storyboard-track')
  }

  /** Pixels the sticky header itself occupies (--wf-bar-h, the walkthrough bar when
   *  active, plus its own fixed 4rem/h-16) — the sticky stage pins at this offset,
   *  not the bare viewport top, matching the same top-[calc(var(--wf-bar-h)+4rem)]
   *  convention the rest of the kit already uses for "sits right below the header".
   *  Getting this right is what fixes both the dead scroll zone before the stage
   *  visually starts, and the sub-pixel seam at release (the stage's own height was
   *  previously computed against the bare viewport too, running it a fraction past
   *  where it was actually pinned). */
  private headerOffset(): number {
    const barH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--wf-bar-h')) || 0
    return barH + 64
  }

  /** Progress through the track, from the wrapper's own position — not an
   *  IntersectionObserver on invisible markers, which doesn't apply here since the
   *  "stage" itself never leaves the viewport while pinned. `total` is the distance
   *  the track can scroll under the pinned stage before releasing it. */
  private onScroll = () => {
    const el = this.track()
    if (!el) return
    const header = this.headerOffset()
    const rect = el.getBoundingClientRect()
    const stageH = window.innerHeight - header
    const total = rect.height - stageH
    const progress = total <= 0 ? 0 : Math.min(1, Math.max(0, (header - rect.top) / total))
    const i = Math.min(BEATS.length - 1, Math.floor(progress * BEATS.length))
    if (i !== this.activeBeat) this.activeBeat = i
    // Hide once all 5 beats have been reached (progress === 1), not once the stage
    // has fully cleared the header line - the latter needs more scroll distance than
    // a short footer can actually provide, so it could never trigger in practice.
    // There's nothing left to jump to once the last beat has been reached anyway.
    const showRail = progress < 1
    if (showRail !== this.showRail) this.showRail = showRail
  }

  /** Scrolls to the middle of a beat's own range within the track, not its exact
   *  boundary — avoids landing exactly on a rounding edge between two beats. */
  private jumpTo(i: number) {
    const el = this.track()
    if (!el) return
    const header = this.headerOffset()
    const rect = el.getBoundingClientRect()
    const stageH = window.innerHeight - header
    const total = rect.height - stageH
    const trackDocTop = rect.top + window.scrollY
    const targetProgress = (i + 0.5) / BEATS.length
    window.scrollTo({ top: trackDocTop + targetProgress * Math.max(total, 0), behavior: 'smooth' })
  }

  private rail() {
    if (!this.showRail) return ''
    return html`
      <nav aria-label="Jump to section"
        class="fixed z-30 right-2 top-1/2 -translate-y-1/2 flex flex-col gap-3 sm:right-4">
        ${BEATS.map((b, i) => html`
          <button type="button" aria-label=${b.label} aria-current=${this.activeBeat === i ? 'true' : 'false'}
            @click=${() => this.jumpTo(i)}
            class="group flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 lg:justify-start">
            <span class="h-2.5 w-2.5 rounded-full transition-colors ${this.activeBeat === i ? 'bg-gray-900' : 'bg-gray-300 group-hover:bg-gray-500'}"></span>
            <span class="hidden text-xs font-medium lg:inline ${this.activeBeat === i ? 'text-gray-900' : 'text-gray-500'}">${b.label}</span>
          </button>`)}
      </nav>`
  }

  /** One absolutely-stacked, full-viewport panel. Crossfades by opacity rather than
   *  display:none so the transition is soft, not a hard cut; pointer-events is toggled
   *  alongside opacity so an inactive panel's links can't be tabbed/clicked into.
   *
   *  The caption lives inside the same centred content block as everything else,
   *  not pinned to the panel's own bottom edge as a separate element — during the
   *  sticky stage's final release (sliding away as an ordinary block once scroll
   *  passes the track's own height), only the bottom slice of a tall panel stays in
   *  the visible band. A caption anchored independently at the panel's bottom would
   *  be the one thing left in that slice once the real content above it had already
   *  scrolled out of view, reading as a stray caption on bare grey. Keeping it in
   *  the same flow means that slice either shows real content with its caption, or
   *  nothing — never an orphaned fragment. */
  private panel(i: number, body: TemplateResult): TemplateResult {
    const active = this.activeBeat === i
    return html`
      <div aria-hidden=${!active} class="absolute inset-0 flex flex-col bg-gray-200 transition-opacity duration-500 ${active ? 'opacity-100' : 'pointer-events-none opacity-0'}">
        <!-- px grows below lg to reserve room for the fixed quick-jump rail at right-4/right-6
             (dots-only there, see rail()) - symmetric on both sides so the column just narrows
             and stays centred, rather than visibly shifting left. lg+ drops back to px-6 since
             the rail there sits further out with its own label text and content has more room. -->
        <div class="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-12 py-8 text-center sm:px-14 lg:px-6">
          ${body}
          <p class="mt-6 text-center text-xs italic text-gray-500">${BEATS[i].caption}</p>
        </div>
      </div>`
  }

  render() {
    return html`
      <!-- Rail rendered OUTSIDE the full-bleed wrapper below, not nested inside it: that wrapper
           carries a transform (see its own comment), and a transform on any ancestor makes that
           ancestor the containing block for position:fixed descendants instead of the viewport -
           the rail was nested inside it and had stopped being fixed to the screen, scrolling with
           the page like an ordinary element. Rendering it as a sibling here, with no transformed
           ancestor between it and the viewport, restores normal fixed behaviour. -->
      ${this.rail()}

      <!-- Full-bleed breakout: <main> is mx-auto max-w-[1600px], and the earlier -mx-4/-mx-6/-mx-8
           trick only cancelled its padding, not that width cap - the scene was reading as a
           grey box with visible white margins on anything wider than 1600px. left-1/2 plus a
           -50% transform re-centres this wrapper on the viewport regardless of main's own
           (narrower, but still viewport-centred via its own mx-auto) width, giving the scene
           true edge-to-edge width on any monitor. Vertical negative margin still cancels
           main's own py padding, unrelated to this. -->
      <div class="relative left-1/2 w-screen -translate-x-1/2 -my-12 sm:-my-16">
        <div id="storyboard-track" class="relative" style="height: calc(${BEATS.length} * 100svh)">
          <div class="sticky top-[calc(var(--wf-bar-h)+4rem)] h-[calc(100svh-var(--wf-bar-h)-4rem)] w-full overflow-hidden">

            <!-- 1. The Gate — no CTA by design; "Book a Visit" is always in the header. -->
            ${this.panel(0, html`
              <h1 class="text-3xl font-semibold text-gray-900 sm:text-5xl xl:text-7xl">A <em class="font-serif italic">London</em> school with room to grow.</h1>
              <p class="mt-4 max-w-xl text-base text-gray-600 sm:text-lg xl:mt-6 xl:max-w-2xl xl:text-xl">Academic strength, warmth and community since 1737.</p>
              <div class="mt-8 flex animate-bounce flex-col items-center gap-2 text-gray-400 xl:mt-14">
                <span class="text-xs font-medium uppercase tracking-wide">Scroll to discover</span>
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            `)}

            <!-- 2. The Archway — the choice, right before arriving. Cards scroll horizontally
                 on narrow screens rather than stacking, so this stays one screen tall. -->
            ${this.panel(1, html`
              <h2 class="text-2xl font-semibold text-gray-900 sm:text-3xl xl:text-5xl">Which way will you go?</h2>
              <p class="mt-2 text-gray-600 xl:mt-4 xl:text-xl">Three paths lead from here, each into the same school.</p>
              <div class="mt-6 flex w-full max-w-3xl snap-x gap-4 overflow-x-auto px-2 pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 xl:mt-12 xl:max-w-5xl xl:gap-8">
                <a id="cta-home-prep" href="prep.html" class="w-56 shrink-0 snap-center rounded-xl border border-gray-200 bg-white p-4 text-left hover:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 sm:w-auto xl:p-8">
                  <h3 class="font-semibold text-gray-900 xl:text-2xl">7+ Prep</h3>
                  <p class="mt-1 text-sm text-gray-600 xl:mt-2 xl:text-base">Ages 7 to 11.</p>
                  <span class="mt-2 inline-flex items-center text-sm font-medium text-gray-900 xl:mt-4 xl:text-base">Explore ${arrowIcon()}</span>
                </a>
                <a id="cta-home-senior" href="senior.html" class="w-56 shrink-0 snap-center rounded-xl border border-gray-200 bg-white p-4 text-left hover:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 sm:w-auto xl:p-8">
                  <h3 class="font-semibold text-gray-900 xl:text-2xl">11+ Senior</h3>
                  <p class="mt-1 text-sm text-gray-600 xl:mt-2 xl:text-base">Ages 11 to 16.</p>
                  <span class="mt-2 inline-flex items-center text-sm font-medium text-gray-900 xl:mt-4 xl:text-base">Explore ${arrowIcon()}</span>
                </a>
                <a id="cta-home-sixth-form" href="sixth-form.html" class="w-56 shrink-0 snap-center rounded-xl border border-gray-200 bg-white p-4 text-left hover:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 sm:w-auto xl:p-8">
                  <h3 class="font-semibold text-gray-900 xl:text-2xl">16+ Sixth Form</h3>
                  <p class="mt-1 text-sm text-gray-600 xl:mt-2 xl:text-base">The final two years.</p>
                  <span class="mt-2 inline-flex items-center text-sm font-medium text-gray-900 xl:mt-4 xl:text-base">Explore ${arrowIcon()}</span>
                </a>
              </div>
            `)}

            <!-- 3. Quad, orbit 1 — credibility. -->
            ${this.panel(2, html`
              <h2 class="text-2xl font-semibold text-gray-900 sm:text-3xl xl:text-5xl">Proof, carved in stone</h2>
              <p class="mx-auto mt-2 max-w-xl text-sm text-gray-600 sm:text-base xl:mt-4 xl:max-w-2xl xl:text-xl">85% of our leavers go on to top-25% universities. Every Sixth Former studies maths.</p>
              <dl class="mt-6 grid grid-cols-4 gap-3 sm:gap-6 xl:mt-12 xl:gap-10">
                <div><dd class="text-xl font-semibold text-gray-900 sm:text-2xl xl:text-4xl">7-18</dd><dd class="mt-1 text-[11px] text-gray-500 sm:text-xs xl:mt-2 xl:text-sm">One through-school</dd></div>
                <div><dd class="text-xl font-semibold text-gray-900 sm:text-2xl xl:text-4xl">2025</dd><dd class="mt-1 text-[11px] text-gray-500 sm:text-xs xl:mt-2 xl:text-sm">ISI Inspection</dd></div>
                <div><dd class="text-xl font-semibold text-gray-900 sm:text-2xl xl:text-4xl">10-15%</dd><dd class="mt-1 text-[11px] text-gray-500 sm:text-xs xl:mt-2 xl:text-sm">Scholarship value</dd></div>
                <div><dd class="text-xl font-semibold text-gray-900 sm:text-2xl xl:text-4xl">2</dd><dd class="mt-1 text-[11px] text-gray-500 sm:text-xs xl:mt-2 xl:text-sm">Family of Schools</dd></div>
              </dl>
              <!-- Awards and Recognition badges row (client request): the former plain caption
                   line, now a row of linked badge pills rather than a flat text line. -->
              <a id="cta-home-awards-badges" href="about-awards-recognition.html" class="mt-5 flex flex-wrap justify-center gap-2 xl:mt-8 group" aria-label="See our Awards and Recognition">
                <span class="rounded-full border border-gray-300 px-2.5 py-1 text-[11px] text-gray-600 group-hover:border-gray-400 xl:text-sm">Independent Schools of the Year Finalist 2025</span>
                <span class="rounded-full border border-gray-300 px-2.5 py-1 text-[11px] text-gray-600 group-hover:border-gray-400 xl:text-sm">Pastoral Care Award Winner 2025</span>
                <span class="rounded-full border border-gray-300 px-2.5 py-1 text-[11px] text-gray-600 group-hover:border-gray-400 xl:text-sm">ISI Inspection 2025</span>
              </a>
              <div class="mt-6 flex flex-wrap justify-center gap-3 xl:mt-10 xl:gap-4">
                <a id="cta-home-academic-promo" href="results-destinations.html" class="inline-flex items-center rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 xl:px-6 xl:py-3 xl:text-base">Explore our academic results</a>
                <a id="cta-home-rankings-promo" href="about-awards-recognition.html" class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 xl:px-6 xl:py-3 xl:text-base">See our awards and recognition</a>
              </div>
            `)}

            <!-- 4. Quad, orbit 2 — the Head's welcome. Primary CTA plays the video in place; secondary routes to the full page. -->
            ${this.panel(3, html`
              <h2 class="text-2xl font-semibold text-gray-900 sm:text-3xl xl:text-5xl">A welcome from our Head</h2>
              <div class="mt-4 w-full max-w-xs xl:mt-8 xl:max-w-lg">
                ${videoPlaceholder(this.welcomePlaying ? 'Playing: a welcome from our Head' : 'A welcome from our Head', () => { this.welcomePlaying = true }, 'aspect-video w-full', 'rounded-lg')}
              </div>
              <p class="mt-4 max-w-md text-sm text-gray-600 xl:mt-6 xl:max-w-xl xl:text-lg">Read why our Head believes Bancroft’s offers a genuinely complete school experience, academically and beyond.</p>
              <a id="cta-home-welcome-read" href="about-welcome.html" class="mt-3 inline-flex items-center text-sm font-medium text-gray-900 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 xl:mt-4 xl:text-base">Read the Head’s welcome ${arrowIcon()}</a>
            `)}

            <!-- 5. Quad, orbit 3 — news, community, the closing invitation. Cards scroll
                 horizontally on narrow screens, same reasoning as beat 2. -->
            ${this.panel(4, html`
              <h2 class="text-2xl font-semibold text-gray-900 sm:text-3xl xl:text-5xl">Already part of Bancroft’s?</h2>
              <p class="mx-auto mt-2 max-w-xl text-sm text-gray-600 sm:text-base xl:mt-4 xl:max-w-2xl xl:text-xl">
                Also part of a wider
                <a id="cta-home-family-of-schools" href="about-family-of-schools.html" class="font-medium text-gray-900 underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded-sm">Family of Schools</a>,
                including two Prep partners who share our values.
              </p>
              <div class="mt-6 flex w-full max-w-3xl snap-x gap-4 overflow-x-auto px-2 pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 xl:mt-12 xl:max-w-5xl xl:gap-8">
                <a id="cta-home-news-article" href="news-article-a.html" class="w-56 shrink-0 snap-center rounded-xl border border-gray-200 bg-white p-4 text-left hover:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 sm:w-auto xl:p-8">
                  <span class="text-[11px] font-medium uppercase tracking-wide text-gray-400 xl:text-xs">Senior</span>
                  <h3 class="mt-1 text-sm font-semibold text-gray-900 xl:mt-2 xl:text-xl">Outstanding GCSE results</h3>
                </a>
                <a href="news-article-b.html" class="w-56 shrink-0 snap-center rounded-xl border border-gray-200 bg-white p-4 text-left hover:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 sm:w-auto xl:p-8">
                  <span class="text-[11px] font-medium uppercase tracking-wide text-gray-400 xl:text-xs">Prep</span>
                  <h3 class="mt-1 text-sm font-semibold text-gray-900 xl:mt-2 xl:text-xl">Two new Prep partners</h3>
                </a>
                <a href="news-article-c.html" class="w-56 shrink-0 snap-center rounded-xl border border-gray-200 bg-white p-4 text-left hover:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 sm:w-auto xl:p-8">
                  <span class="text-[11px] font-medium uppercase tracking-wide text-gray-400 xl:text-xs">Senior</span>
                  <h3 class="mt-1 text-sm font-semibold text-gray-900 xl:mt-2 xl:text-xl">First XV, London Schools champions</h3>
                </a>
              </div>
              <div class="mt-6 flex flex-wrap justify-center gap-3 xl:mt-10 xl:gap-4">
                <a id="cta-home-book-visit" href="book-a-visit.html" class="inline-flex items-center rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 xl:px-6 xl:py-3 xl:text-base">Book a Visit</a>
                <a id="cta-home-school-life-promo" href="school-life.html" class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 xl:px-6 xl:py-3 xl:text-base">Go to School Life</a>
              </div>
            `)}

          </div>
        </div>
      </div>`
  }
}
