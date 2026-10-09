import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Light } from '../base'
import { arrowIcon } from './utils'

@customElement('wf-logos')
export class WfLogos extends Light {
  @property() heading = ''
  @property({ attribute: false }) names: string[] = []
  /** Optional link shown under the logo row — e.g. through to the page that explains the awards. */
  @property({ attribute: 'cta-label' }) ctaLabel = ''
  @property({ attribute: 'cta-href' }) ctaHref = ''

  render() {
    return html`
      <section>
        ${this.heading ? html`<h2 class="text-center text-sm font-semibold uppercase tracking-wide text-gray-500">${this.heading}</h2>` : ''}
        <div class="mt-6 flex flex-wrap items-center justify-center gap-6">
          ${this.names.map((n) => html`
            <div role="img" aria-label=${n} class="h-16 w-40 shrink-0 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center px-3 text-center text-xs text-gray-400">
              ${n}
            </div>`)}
        </div>
        ${this.ctaLabel && this.ctaHref ? html`
          <p class="mt-6 text-center">
            <a href=${this.ctaHref} class="inline-flex items-center text-sm font-medium text-gray-900 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2">
              ${this.ctaLabel} ${arrowIcon()}
            </a>
          </p>` : ''}
      </section>`
  }
}
