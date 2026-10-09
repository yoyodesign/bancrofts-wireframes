import { html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { Light } from '../base'
import { mediaPlaceholder, videoPlaceholder, closeIcon } from './utils'

@customElement('wf-media')
export class WfMedia extends Light {
  @property() type: 'image' | 'video' = 'image'
  @property() label = 'Media'
  @property() caption = ''
  @property({ attribute: 'aspect-class' }) aspectClass = 'aspect-video'
  /** Horizontally centers the block (`mx-auto max-w-3xl`) instead of filling its container —
   *  use when this media sits inline in a centered reading column (e.g. mid-article), matching
   *  the width of a centered wf-text block above/below it. */
  @property({ type: Boolean }) centered = false
  @state() private modalOpen = false
  @state() private playing = false

  render() {
    const wrap = this.centered ? 'mx-auto max-w-3xl' : ''
    return html`
      <figure class=${wrap}>
        ${this.type === 'video'
          ? videoPlaceholder(this.label, () => { this.modalOpen = true; this.playing = true }, this.aspectClass, 'rounded-l-lg')
          : mediaPlaceholder(this.label, this.aspectClass, '', 'rounded-l-lg')}
        ${this.caption ? html`<figcaption class="mt-2 text-xs text-gray-500">${this.caption}</figcaption>` : ''}
      </figure>
      ${this.modalOpen ? html`
        <div class="fixed inset-0 z-50 bg-gray-900/80 flex items-center justify-center p-4" @click=${() => (this.modalOpen = false)}>
          <div class="relative w-full max-w-3xl" @click=${(e: Event) => e.stopPropagation()}>
            <button type="button" aria-label="Close video" @click=${() => (this.modalOpen = false)}
              class="absolute -top-10 right-0 text-white flex items-center gap-1 text-sm">
              ${closeIcon()} Close
            </button>
            <div class="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <!-- Traditional bottom control bar, not a centered play/pause pair — this is a wireframe,
                   so only the play/pause toggle is genuinely interactive; the seek bar, time and
                   volume/fullscreen icons are structural placeholders matching a real video player's
                   layout. -->
              <div class="absolute bottom-0 inset-x-0 bg-gray-900/80 px-4 py-2.5 flex items-center gap-3">
                <button type="button" aria-label=${this.playing ? 'Pause' : 'Play'} @click=${() => (this.playing = !this.playing)}
                  class="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded">
                  ${this.playing
                    ? html`<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>`
                    : html`<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`}
                </button>
                <span class="text-xs text-gray-200 tabular-nums shrink-0">0:12 / 2:34</span>
                <div class="flex-1 h-1 rounded-full bg-white/30 overflow-hidden">
                  <div class="h-full w-1/6 bg-white"></div>
                </div>
                <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 010 7"/></svg>
                <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4"/></svg>
              </div>
            </div>
          </div>
        </div>` : ''}
    `
  }
}
