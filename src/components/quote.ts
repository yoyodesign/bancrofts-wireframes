import { html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { Light } from '../base'

export interface QuoteItem { quote: string; attribution: string; role?: string }

@customElement('wf-quote')
export class WfQuote extends Light {
  @property({ attribute: false }) items: QuoteItem[] = []
  @state() private index = 0

  private next() { this.index = (this.index + 1) % this.items.length }
  private prev() { this.index = (this.index - 1 + this.items.length) % this.items.length }

  render() {
    if (!this.items.length) return html``
    const item = this.items[this.index]
    const carousel = this.items.length > 1
    return html`
      <section class="mx-auto max-w-3xl text-center">
        <blockquote>
          <p class="text-xl sm:text-2xl font-medium text-gray-900">&ldquo;${item.quote}&rdquo;</p>
          <footer class="mt-4 text-sm text-gray-500">
            ${item.attribution}${item.role ? html`, <span>${item.role}</span>` : ''}
          </footer>
        </blockquote>
        ${carousel ? html`
          <div class="mt-6 flex items-center justify-center gap-4">
            <button type="button" aria-label="Previous quote" @click=${this.prev}
              class="rounded-full border border-gray-300 p-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 6l-6 6 6 6"/></svg>
            </button>
            <div class="flex gap-1.5">
              ${this.items.map((_, i) => html`
                <span class="h-1.5 w-1.5 rounded-full ${i === this.index ? 'bg-gray-800' : 'bg-gray-300'}"></span>`)}
            </div>
            <button type="button" aria-label="Next quote" @click=${this.next}
              class="rounded-full border border-gray-300 p-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
            </button>
          </div>` : ''}
      </section>`
  }
}
