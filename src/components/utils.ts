import { html } from 'lit'

/** Shared grey-box media placeholder per design-system.md.
 *  roundedClass defaults to rounding all 4 corners; pass an override (e.g. 'rounded-l-lg' or
 *  'rounded-none') when the media sits flush against another edge — see components.md → "Media". */
export function mediaPlaceholder(label: string, aspectClass = 'aspect-video', extra = '', roundedClass = 'rounded-lg') {
  return html`
    <div role="img" aria-label=${label}
         class="bg-gray-200 text-gray-400 ${roundedClass} flex items-center justify-center ${aspectClass} overflow-hidden ${extra}">
      <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="1.5"/><path d="M21 15l-5-5L5 21"/>
      </svg>
    </div>`
}

export function videoPlaceholder(label: string, onPlay: () => void, aspectClass = 'aspect-video', roundedClass = 'rounded-lg') {
  return html`
    <button type="button" @click=${onPlay} aria-label="Play ${label}"
      class="relative w-full ${aspectClass} bg-gray-200 ${roundedClass} flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
      <span class="flex items-center justify-center h-14 w-14 rounded-full bg-white/90 text-gray-800 [animation:wf-pop-in_0.3s_ease-out]">
        <svg class="w-6 h-6 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </span>
    </button>`
}

export function closeIcon() {
  return html`<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>`
}

export function chevronIcon(open: boolean) {
  return html`<svg class="w-5 h-5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>`
}

export function hamburgerIcon() {
  return html`<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`
}

export function arrowIcon() {
  return html`<svg aria-hidden="true" class="w-4 h-4 ml-1 inline shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`
}

export function gridIcon() {
  return html`<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`
}

export interface CardItem {
  /** Omit for a display-only card with no real destination (e.g. a team/bio card) — it renders
   *  as a plain, non-clickable card with no link affordance instead of an <a>. See components.md
   *  → "Cards" for when to leave this out. */
  href?: string
  heading: string
  description?: string
  imageLabel?: string
  linkText?: string
  id?: string
  category?: string
}

