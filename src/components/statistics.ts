import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Light } from '../base'

export interface StatItem { value: string; label: string }

// Literal class lookup — Tailwind can't see runtime-built class names.
const COLS: Record<number, string> = {
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
}

@customElement('wf-statistics')
export class WfStatistics extends Light {
  @property() heading = ''
  @property({ attribute: false }) items: StatItem[] = []

  render() {
    const colsClass = COLS[Math.min(Math.max(this.items.length, 3), 5)] ?? COLS[3]
    return html`
      <section>
        ${this.heading ? html`<h2 class="text-center text-sm font-semibold uppercase tracking-wide text-gray-500">${this.heading}</h2>` : ''}
        <dl class="mt-8 rounded-xl border border-gray-200 bg-white p-8 grid grid-cols-2 ${colsClass} gap-8 text-center">
          ${this.items.map((s) => html`
            <div>
              <dt class="sr-only">${s.label}</dt>
              <dd class="text-3xl sm:text-4xl font-semibold text-gray-900">${s.value}</dd>
              <p class="mt-1 text-sm text-gray-500">${s.label}</p>
            </div>`)}
        </dl>
      </section>`
  }
}
