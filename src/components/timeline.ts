import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Light } from '../base'

export interface TimelineStep {
  heading: string
  description: string
}

/** A genuine gap in the fixed component kit: nothing expresses an ordered sequence of steps as a
 *  sequence — the admissions journey pages ("Register → Visit → Assess → Offer") were forcing that
 *  into a plain wf-cards grid, which reads as three unrelated boxes, not a process. This is a real,
 *  bespoke addition (not a shared-kit gap), added at the client's request after seeing a step-by-step
 *  treatment work well in their own pitch design — see PROTOTYPE.md. Numbered nodes connected by a
 *  single vertical line, kept in the kit's neutral greyscale (a real build would carry brand colour on
 *  the line/nodes, but this wireframe stays structural-only per design-system.md). */
@customElement('wf-timeline')
export class WfTimeline extends Light {
  @property() heading = ''
  @property({ attribute: false }) items: TimelineStep[] = []

  render() {
    return html`
      <section>
        ${this.heading ? html`<h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">${this.heading}</h2>` : ''}
        <div class="relative max-w-2xl">
          <div class="absolute left-4 top-0 bottom-0 w-px bg-gray-300" aria-hidden="true"></div>
          <ol class="space-y-8">
            ${this.items.map((step, i) => html`
              <li class="relative pl-14">
                <span class="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-sm font-semibold text-white">${i + 1}</span>
                <h3 class="text-lg font-semibold text-gray-900">${step.heading}</h3>
                <p class="mt-1 text-sm text-gray-600">${step.description}</p>
              </li>`)}
          </ol>
        </div>
      </section>`
  }
}
