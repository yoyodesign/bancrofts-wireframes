import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Light } from '../base'

@customElement('wf-text')
export class WfText extends Light {
  @property() heading = ''
  @property({ attribute: false }) body: string[] = []
  /** Text/paragraph alignment — independent of whether the block itself is centered in its
   *  container (see `centered` below). Most body copy stays 'left' even when the block is
   *  horizontally centered — a centered reading column with left-aligned prose is the normal
   *  article pattern; 'center' is for short, deliberately centred callout-style copy. */
  @property() align: 'left' | 'center' = 'left'
  /** Horizontally centers the block itself (`mx-auto`) within its parent instead of hugging the
   *  left edge — use for a centered reading column (e.g. article body copy), independent of the
   *  `align` prop which only controls the text's own alignment within that column. Defaults to
   *  following `align` (see render()) since center-aligned text in a left-hugging container reads
   *  as broken, not intentional — there's no real case for that combination, so `align="center"`
   *  centers the container too unless this is explicitly set. */
  @property({ type: Boolean }) centered = false

  render() {
    // A center-aligned paragraph inside a container that isn't itself centered on the page looks
    // like a layout bug (lines centered within a box that's stuck on the left) — so align=center
    // centers the container by default too, unless `centered` was explicitly passed.
    const isCentered = this.centered || this.align === 'center'
    const containerClass = isCentered ? 'mx-auto max-w-3xl' : 'max-w-3xl'
    const textAlignClass = this.align === 'center' ? 'text-center' : ''
    return html`
      <section class="${containerClass} ${textAlignClass}">
        ${this.heading ? html`<h2 class="text-2xl sm:text-3xl font-semibold text-gray-900">${this.heading}</h2>` : ''}
        <div class="mt-4 space-y-4">
          ${this.body.map((p) => html`<p class="text-base text-gray-700">${p}</p>`)}
        </div>
      </section>`
  }
}
