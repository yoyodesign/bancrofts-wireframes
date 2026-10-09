import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Light } from '../base'

/** A genuine gap in the fixed 18-component kit: none of the existing components can express a real
 *  data table (a row label plus one or more data columns) — wf-statistics is single value/label pairs,
 *  not a grid. Added per components.md → "Reuse before adding" for pages like Fees that need to show
 *  real comparable figures across columns (e.g. net fee vs. fee payable) rather than a flat list of
 *  stats. See PROTOTYPE.md for this addition flagged back for the shared kit. */
export interface TableRow {
  label: string
  cells: string[]
}

@customElement('wf-table')
export class WfTable extends Light {
  @property() heading = ''
  /** Header for the row-label column (the table's first, unlabelled-by-data column). */
  @property({ attribute: 'row-header' }) rowHeader = ''
  @property({ attribute: false }) columns: string[] = []
  @property({ attribute: false }) rows: TableRow[] = []

  render() {
    return html`
      <section>
        ${this.heading ? html`<h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">${this.heading}</h2>` : ''}
        <div class="overflow-x-auto rounded-xl border border-gray-200">
          <table class="w-full min-w-[480px] border-collapse text-left">
            <thead>
              <tr class="bg-gray-800 text-white">
                <th scope="col" class="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide whitespace-nowrap">${this.rowHeader}</th>
                ${this.columns.map((c) => html`<th scope="col" class="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide whitespace-nowrap">${c}</th>`)}
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              ${this.rows.map((r) => html`
                <tr>
                  <th scope="row" class="px-5 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">${r.label}</th>
                  ${r.cells.map((c) => html`<td class="px-5 py-4 text-sm text-gray-700 whitespace-nowrap">${c}</td>`)}
                </tr>`)}
            </tbody>
          </table>
        </div>
      </section>`
  }
}
