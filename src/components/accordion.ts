import { html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { Light } from '../base'
import { arrowIcon, chevronIcon } from './utils'

export interface AccordionItem {
  heading: string
  body: string
  /** Optional link shown under the body once expanded — e.g. "Read the full policy (PDF)". */
  ctaLabel?: string
  ctaHref?: string
}

@customElement('wf-accordion')
export class WfAccordion extends Light {
  @property() heading = ''
  @property({ attribute: false }) items: AccordionItem[] = []
  @property({ type: Boolean, attribute: 'multi-open' }) multiOpen = false
  @state() private openIndexes = new Set<number>()

  private toggle(i: number) {
    const next = new Set(this.multiOpen ? this.openIndexes : [])
    if (this.openIndexes.has(i)) next.delete(i)
    else next.add(i)
    this.openIndexes = next
  }

  render() {
    return html`
      <section class="max-w-3xl">
        ${this.heading ? html`<h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">${this.heading}</h2>` : ''}
        <div class="rounded-xl border border-gray-200 bg-white divide-y divide-gray-200 px-5">
          ${this.items.map((item, i) => {
            const open = this.openIndexes.has(i)
            return html`
              <div>
                <h3>
                  <button type="button" aria-expanded=${open} @click=${() => this.toggle(i)}
                    class="w-full flex items-center justify-between gap-4 py-5 text-left text-base font-medium text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900">
                    ${item.heading} ${chevronIcon(open)}
                  </button>
                </h3>
                ${open ? html`
                  <div class="pb-5 text-sm text-gray-600">
                    <p>${item.body}</p>
                    ${item.ctaLabel && item.ctaHref ? html`
                      <a href=${item.ctaHref} class="mt-3 inline-flex items-center text-sm font-medium text-gray-900 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2">
                        ${item.ctaLabel} ${arrowIcon()}
                      </a>` : ''}
                  </div>` : ''}
              </div>`
          })}
        </div>
      </section>`
  }
}
