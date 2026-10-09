import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Light } from '../base'

/** A "classic" promo banner — full-width image placeholder with heading/body/CTA centred on top
 *  of it, same visual family as wf-homepage-hero (grey placeholder + dark legibility overlay +
 *  white centred text), just contained within the page column instead of breaking out to the true
 *  viewport edges. This replaced an earlier two-column (image one side, text card the other)
 *  layout, at the client's request, specifically so Promo reads as visually distinct from
 *  Text & Media rather than a smaller variant of it. `side` (left/right) is gone with it — there's
 *  only one column now, so it had nothing left to mean. */
@customElement('wf-promo')
export class WfPromo extends Light {
  @property() heading = ''
  @property() body = ''
  @property({ attribute: 'cta-label' }) ctaLabel = ''
  @property({ attribute: 'cta-href' }) ctaHref = ''
  @property({ attribute: 'cta-id' }) ctaId = ''
  @property({ attribute: 'media-label' }) mediaLabel = 'Promo image'

  render() {
    return html`
      <!-- Mobile: h-[80vh], no aspect-ratio - matches wf-standard-hero's own mobile treatment
           (see standard-hero.ts), so the closing promo reads with the same weight as the opening
           hero rather than the flattened strip aspect-[21/9] becomes at phone widths. sm: and up
           reverts to that 21:9 banner. py-10 is a floor under the flex centring either way, so the
           text never sits flush against the card's top/bottom edge even at the shortest heights. -->
      <div class="relative rounded-xl overflow-hidden h-[80vh] sm:h-auto sm:aspect-[21/9]">
        <div role="img" aria-label=${this.mediaLabel} class="absolute inset-0 bg-gray-300"></div>
        <div class="absolute inset-0 bg-gray-900/55"></div>
        <div class="relative h-full px-6 py-10 flex flex-col items-center justify-center text-center">
          <h3 class="text-xl sm:text-2xl font-semibold text-white">${this.heading}</h3>
          <p class="mt-3 max-w-xl text-sm sm:text-base text-gray-100">${this.body}</p>
          ${this.ctaLabel ? html`
            <a href=${this.ctaHref} id=${this.ctaId || undefined}
               class="mt-6 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              ${this.ctaLabel}
            </a>` : ''}
        </div>
      </div>`
  }
}
