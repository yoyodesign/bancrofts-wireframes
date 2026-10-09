import { html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { Light } from '../base'

/** Article/detail-page share row — Facebook, LinkedIn, Email and Copy link. Not a full social
 *  integration (this is a wireframe): Copy link is the one genuinely interactive control
 *  (writes the current URL to the clipboard and shows brief confirmation); the others are
 *  structural placeholders. See components.md → "Share". */
@customElement('wf-share')
export class WfShare extends Light {
  @property() heading = 'Share this story'
  /** Horizontally centers the block (`mx-auto max-w-3xl`) instead of filling its container —
   *  use when this share row closes a centered reading column (e.g. end of article body copy),
   *  matching the width of the wf-text/wf-media blocks above it. */
  @property({ type: Boolean }) centered = false
  @state() private copied = false

  private async copyLink() {
    try {
      await navigator.clipboard.writeText(location.href)
    } catch {
      // clipboard API unavailable (e.g. insecure context) — still show the confirmation,
      // this is a wireframe interaction, not a production copy feature.
    }
    this.copied = true
    setTimeout(() => { this.copied = false }, 2000)
  }

  private button(label: string, icon: ReturnType<typeof html>, onClick: (e: Event) => void) {
    return html`
      <button type="button" @click=${onClick}
        class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
        ${icon} ${label}
      </button>`
  }

  render() {
    const wrap = this.centered ? 'mx-auto max-w-3xl' : ''
    return html`
      <section class="${wrap} border-y border-gray-200 py-6 flex flex-wrap items-center gap-4">
        <span class="text-sm font-semibold text-gray-900">${this.heading}</span>
        <div class="flex flex-wrap gap-2">
          ${this.button('Facebook', html`<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.5c0-.9.2-1.5 1.5-1.5h1.6V4.3C16.3 4.2 15.3 4 14.2 4c-2.4 0-4 1.5-4 4.1V10.5H7.7v3H10.2V21h3.3z"/></svg>`, (e) => e.preventDefault())}
          ${this.button('LinkedIn', html`<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 8.5H3.56V20.5H6.94V8.5Z"/><path d="M5.25 7.06A1.96 1.96 0 1 0 5.25 3.14A1.96 1.96 0 0 0 5.25 7.06Z"/><path d="M20.5 13.6C20.5 10.4 18.9 8.9 16.7 8.9C15 8.9 14.2 9.8 13.8 10.5V9.17H10.4C10.45 10.1 10.4 20.5 10.4 20.5H13.8V13.9C13.8 13.55 13.83 13.2 13.93 12.95C14.2 12.25 14.83 11.53 15.9 11.53C17.3 11.53 17.1 12.9 17.1 14.05V20.5H20.5V13.6Z"/></svg>`, (e) => e.preventDefault())}
          ${this.button('Email', html`<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>`, (e) => e.preventDefault())}
          ${this.button(this.copied ? 'Copied!' : 'Copy link', html`<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 13a5 5 0 007.07 0l1.93-1.93a5 5 0 00-7.07-7.07L10.5 5.43"/><path d="M14 11a5 5 0 00-7.07 0L5 12.93a5 5 0 007.07 7.07L13.5 18.57"/></svg>`, () => this.copyLink())}
        </div>
      </section>`
  }
}
