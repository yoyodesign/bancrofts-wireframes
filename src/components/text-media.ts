import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Light } from '../base'
import { arrowIcon, mediaPlaceholder } from './utils'

@customElement('wf-text-media')
export class WfTextMedia extends Light {
  @property() heading = ''
  @property({ attribute: false }) body: string[] = []
  @property() side: 'left' | 'right' = 'left'
  @property({ attribute: 'media-label' }) mediaLabel = 'Section image'
  /** CTA is always rendered as a button (optionally paired with a `secondaryLabel` button) — there
   *  is no bare-text-link rendering mode for a primary action. A block with no CTA at all is fine
   *  (omit ctaLabel); a block that does have a next step should read as one, the same weight as
   *  every other CTA in the kit, not a smaller/quieter underlined link. Mutually exclusive with
   *  `links` below — set one or the other, not both. */
  @property({ attribute: 'cta-label' }) ctaLabel = ''
  @property({ attribute: 'cta-href' }) ctaHref = '#'
  @property({ attribute: 'cta-id' }) ctaId = ''
  @property({ attribute: 'secondary-label' }) secondaryLabel = ''
  @property({ attribute: 'secondary-href' }) secondaryHref = '#'
  /** For a short row of same-weight REFERENCE links (e.g. School Bus Service's routes/pricing,
   *  Terms and Conditions, Information Booklet) rather than one primary action — these render as
   *  plain text + arrow, not buttons, since they're all reference material at the same level, not a
   *  "next step" that deserves button weight. Takes over from ctaLabel/secondaryLabel when set. */
  @property({ attribute: false }) links: { label: string; href: string }[] = []

  render() {
    const textCol = html`
      <div>
        ${this.heading ? html`<h2 class="text-2xl sm:text-3xl font-semibold text-gray-900">${this.heading}</h2>` : ''}
        <div class="mt-4 space-y-4">${this.body.map((p) => html`<p class="text-base text-gray-700">${p}</p>`)}</div>
        ${this.links.length ? html`
          <div class="mt-5 flex flex-col gap-2">
            ${this.links.map((l) => html`
              <a href=${l.href} class="inline-flex items-center self-start text-sm font-medium text-gray-900 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2">
                ${l.label} ${arrowIcon()}
              </a>`)}
          </div>` : this.ctaLabel ? html`
          <div class="mt-5 flex flex-wrap items-center gap-3">
            <a href=${this.ctaHref} id=${this.ctaId || undefined} class="inline-block rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">${this.ctaLabel}</a>
            ${this.secondaryLabel ? html`
              <a href=${this.secondaryHref} class="inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-gray-800 border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">${this.secondaryLabel}</a>` : ''}
          </div>` : ''}
      </div>`
    // Media is ALWAYS first in DOM, text always second — so a stacked (mobile/tablet) layout is
    // always image-then-text, regardless of `side`. `side="right"` only reorders the two columns
    // visually at `lg:` and above, via `lg:order-last` on the media column — it never touches the
    // DOM order itself, which is what stacking below `lg:` actually follows.
    const mediaCol = html`<div class=${this.side === 'right' ? 'lg:order-last' : ''}>${mediaPlaceholder(this.mediaLabel, 'aspect-square sm:aspect-[4/3]')}</div>`
    return html`
      <section class="grid gap-8 sm:gap-12 lg:grid-cols-2 items-center">
        ${mediaCol}${textCol}
      </section>`
  }
}
