import { html, type TemplateResult } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { Light } from '../base'
import { pages, primaryNav, corePages, footerColumns, footerLegalLinks, headerCta, CORE_PAGE_TYPES } from '../config'

interface SitemapNode {
  href: string
  label: string
  type: string
  /** Why a real page isn't in the burger menu, if it isn't — shown as a small dashed marker. */
  marker: '' | 'Not in menu' | 'Header button'
  children: SitemapNode[]
}

/** Greyscale only, like the rest of the wireframe — types are told apart by weight, not colour. */
const TAG: Record<string, string> = {
  Homepage: 'bg-gray-900 text-white border-gray-900',
  Content: 'bg-gray-100 text-gray-600 border-gray-300',
  Listing: 'bg-gray-300 text-gray-800 border-gray-400',
  Article: 'bg-white text-gray-700 border-gray-400',
  Detail: 'bg-white text-gray-500 border-gray-300 border-dashed',
  Form: 'bg-gray-600 text-white border-gray-600',
}
const TAG_FALLBACK = 'bg-white text-gray-400 border-gray-300'
const LINE = 'border-gray-400'

const hrefOf = (key: string) => (key === 'homepage' ? 'index.html' : `${key}.html`)

/** Tooling page — the site structure drawn as a tree. Nothing here is its own list of pages:
 *  columns and their order come from `primaryNav`, each page's position from its own breadcrumb,
 *  its type tag from `corePages`, and the footer block from the footer links. Change any of those
 *  in config.ts and this page follows. See PROTOTYPE.md → "Sitemap".
 *
 *  The tree is wider than most windows, so it opens scaled to fit the available width (the whole
 *  structure at a glance, like the original drawing) with a Fit / 100% toggle and +/- steps to
 *  magnify, and click-and-drag to slide around once it's bigger than the window. */
@customElement('wf-sitemap-page')
export class WfSitemapPage extends Light {
  /** 'fit' tracks the window width; a number is a fixed scale chosen with the zoom controls. */
  @state() private zoom: number | 'fit' = 'fit'
  /** The tree's own unscaled size, measured after render — transforms don't change layout size. */
  @state() private natural = { w: 0, h: 0 }
  @state() private fitScale = 1

  private resizeObserver?: ResizeObserver
  private drag: { x: number; y: number; moved: boolean } | null = null
  private suppressClick = false

  firstUpdated() {
    this.measure()
    const viewport = this.querySelector('#wf-sitemap-viewport')
    if (viewport) {
      this.resizeObserver = new ResizeObserver(() => this.measure())
      this.resizeObserver.observe(viewport)
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.resizeObserver?.disconnect()
    this.endDrag()
  }

  private measure() {
    const viewport = this.querySelector<HTMLElement>('#wf-sitemap-viewport')
    const tree = this.querySelector<HTMLElement>('#wf-sitemap-tree')
    if (!viewport || !tree || !tree.offsetWidth) return
    const w = tree.offsetWidth
    const h = tree.offsetHeight
    const fit = Math.min(1, viewport.clientWidth / w)
    if (w !== this.natural.w || h !== this.natural.h) this.natural = { w, h }
    if (Math.abs(fit - this.fitScale) > 0.001) this.fitScale = fit
  }

  private get scale() {
    return this.zoom === 'fit' ? this.fitScale : this.zoom
  }

  private stepZoom(delta: number) {
    const next = Math.round((this.scale + delta) * 10) / 10
    this.zoom = Math.max(0.2, Math.min(1.5, next))
  }

  // Click-and-drag to slide: sideways moves the sitemap inside its frame, up/down moves the page.
  // Mouse only — touch already scrolls natively. A drag past a few pixels swallows the click that
  // follows, so letting go over a page block doesn't open it.
  private onDragStart = (e: MouseEvent) => {
    if (e.button !== 0) return
    this.drag = { x: e.clientX, y: e.clientY, moved: false }
    window.addEventListener('mousemove', this.onDragMove)
    window.addEventListener('mouseup', this.endDrag)
  }

  private onDragMove = (e: MouseEvent) => {
    if (!this.drag) return
    const dx = e.clientX - this.drag.x
    const dy = e.clientY - this.drag.y
    if (!this.drag.moved && Math.hypot(dx, dy) < 5) return
    this.drag = { x: e.clientX, y: e.clientY, moved: true }
    const viewport = this.querySelector<HTMLElement>('#wf-sitemap-viewport')
    if (viewport) viewport.scrollLeft -= dx
    window.scrollBy(0, -dy)
  }

  private endDrag = () => {
    if (this.drag?.moved) {
      this.suppressClick = true
      setTimeout(() => { this.suppressClick = false }, 0)
    }
    this.drag = null
    window.removeEventListener('mousemove', this.onDragMove)
    window.removeEventListener('mouseup', this.endDrag)
  }

  private onClickCapture = (e: MouseEvent) => {
    if (!this.suppressClick) return
    e.preventDefault()
    e.stopPropagation()
  }

  private zoomControls(): TemplateResult {
    const btn = 'rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900'
    const seg = (on: boolean) => `px-3 py-1.5 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900 ${on ? 'bg-gray-800 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`
    const isFit = this.zoom === 'fit'
    const isFull = this.zoom === 1
    return html`
      <div class="flex flex-wrap items-center gap-3" role="group" aria-label="Sitemap zoom">
        <div class="inline-flex overflow-hidden rounded-lg border border-gray-300 divide-x divide-gray-300">
          <button type="button" aria-pressed=${isFit} @click=${() => { this.zoom = 'fit' }} class=${seg(isFit)}>Fit to screen</button>
          <button type="button" aria-pressed=${isFull} @click=${() => { this.zoom = 1 }} class=${seg(isFull)}>100%</button>
        </div>
        <div class="inline-flex items-center gap-2">
          <button type="button" aria-label="Zoom out" ?disabled=${this.scale <= 0.2} @click=${() => this.stepZoom(-0.1)} class=${btn}>&minus;</button>
          <span class="w-10 text-center text-xs tabular-nums text-gray-600" aria-live="polite">${Math.round(this.scale * 100)}%</span>
          <button type="button" aria-label="Zoom in" ?disabled=${this.scale >= 1.5} @click=${() => this.stepZoom(0.1)} class=${btn}>+</button>
        </div>
      </div>`
  }

  private build() {
    const typeByHref = new Map(corePages.map((p) => [p.href, p.type as string]))
    const menuOrder = new Map<string, number>()
    for (const item of primaryNav) {
      menuOrder.set(item.href, menuOrder.size)
      for (const c of item.children || []) if (!menuOrder.has(c.href)) menuOrder.set(c.href, menuOrder.size)
    }

    const nodes = new Map<string, SitemapNode>()
    const parentOf = new Map<string, string | null>()
    for (const [key, page] of Object.entries(pages)) {
      const href = hrefOf(key)
      // Drop the leading "Home" crumb every breadcrumb starts with (see config.ts → bc()).
      const trail: { label: string; href: string }[] = (page.hero?.props?.breadcrumb || []).slice(1)
      const self = trail.length && trail[trail.length - 1].href === href ? trail[trail.length - 1] : null
      const ancestors = self ? trail.slice(0, -1) : trail
      nodes.set(href, {
        href,
        label: key === 'homepage' ? 'Homepage' : self?.label || page.hero?.props?.heading || key,
        type: typeByHref.get(href) || 'Untyped',
        marker: menuOrder.has(href) || key === 'homepage' ? '' : href === headerCta.href ? 'Header button' : 'Not in menu',
        children: [],
      })
      parentOf.set(href, ancestors.length ? ancestors[ancestors.length - 1].href : null)
    }

    const footerLinks = [...footerColumns.flatMap((c) => c.links), ...footerLegalLinks]
    const footerHrefs = new Set(footerLinks.map((l) => l.href))
    const sectionHrefs = new Set(primaryNav.map((n) => n.href))
    const unplaced: SitemapNode[] = []
    for (const [href, node] of nodes) {
      if (href === 'index.html' || sectionHrefs.has(href)) continue
      const parent = parentOf.get(href)
      if (parent && nodes.has(parent)) nodes.get(parent)!.children.push(node)
      else if (!footerHrefs.has(href)) unplaced.push(node)
    }
    // Menu pages first, in menu order; pages outside the menu keep their config.ts order after them.
    for (const node of nodes.values()) {
      node.children = node.children
        .map((child, i) => ({ child, i }))
        .sort((a, b) => (menuOrder.get(a.child.href) ?? Infinity) - (menuOrder.get(b.child.href) ?? Infinity) || a.i - b.i)
        .map((x) => x.child)
    }

    return {
      home: nodes.get('index.html'),
      sections: primaryNav.map((n) => nodes.get(n.href)).filter((n): n is SitemapNode => !!n),
      footer: footerLinks.map((l) => ({ label: l.label, node: nodes.get(l.href) })),
      unplaced,
      all: [...nodes.values()],
    }
  }

  private tag(label: string, classes = TAG[label] || TAG_FALLBACK) {
    return html`<span class="inline-block rounded-full border px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide ${classes}">${label}</span>`
  }

  private marker(label: string) {
    return html`<span class="inline-block rounded-full border border-dashed border-gray-400 px-1.5 py-px text-[9px] font-medium text-gray-500">${label}</span>`
  }

  private windowBar() {
    return html`
      <span class="flex items-center gap-1 h-4 px-2 bg-gray-700">
        <span class="h-1 w-1 rounded-full bg-gray-400"></span><span class="h-1 w-1 rounded-full bg-gray-400"></span><span class="h-1 w-1 rounded-full bg-gray-400"></span>
      </span>`
  }

  private card(node: SitemapNode, from: string): TemplateResult {
    return html`
      <a href=${node.href} aria-label="${node.label} (${node.type})"
        class="block w-44 rounded-md border bg-white overflow-hidden shadow-sm hover:border-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2
          ${node.marker ? 'border-dashed border-gray-400' : 'border-gray-300'} ${node.href === from ? 'ring-2 ring-gray-900 ring-offset-2' : ''}">
        ${this.windowBar()}
        <span class="block px-2.5 py-2">
          <span class="flex flex-wrap gap-1">${this.tag(node.type)}${node.marker ? this.marker(node.marker) : ''}</span>
          <span class="mt-1.5 block text-xs font-semibold text-gray-900 leading-snug">${node.label}</span>
        </span>
      </a>`
  }

  /** A page's children, each hung off one vertical line with an elbow into its card — the line
   *  stops at the last child rather than running on, as in the original sitemap drawing. */
  private branch(children: SitemapNode[], from: string): TemplateResult | '' {
    if (!children.length) return ''
    return html`
      <ul class="ml-6">
        ${children.map((child, i) => html`
          <li class="relative pl-6 pt-4">
            <span class="absolute left-0 top-0 border-l ${LINE} ${i === children.length - 1 ? 'h-9' : 'h-full'}"></span>
            <span class="absolute left-0 top-9 w-6 border-t ${LINE}"></span>
            ${this.card(child, from)}
            ${this.branch(child.children, from)}
          </li>`)}
      </ul>`
  }

  render() {
    const { home, sections, footer, unplaced, all } = this.build()
    const from = document.referrer ? new URL(document.referrer).pathname.split('/').pop() || 'index.html' : ''
    const types = [...CORE_PAGE_TYPES, 'Untyped'].map((t) => ({ type: t as string, count: all.filter((n) => n.type === t).length })).filter((t) => t.count)
    const offMenu = all.filter((n) => n.marker).length

    return html`
      <div class="space-y-6 pb-4">
        <section>
          <p class="text-sm font-semibold uppercase tracking-wide text-gray-500">Prototype</p>
          <h1 class="mt-2 text-3xl sm:text-4xl font-semibold text-gray-900">Sitemap</h1>
        </section>

        <!-- Type key and zoom controls share one row, pinned under the header on wide screens so
             both stay to hand while scrolling a tall tree. -->
        <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 lg:sticky lg:top-[calc(var(--wf-bar-h)+4rem)] lg:z-30 lg:bg-gray-50/95 lg:py-3">
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-600">
            ${types.map((t) => html`<span class="inline-flex items-center gap-1.5">${this.tag(t.type)} ${t.count}</span>`)}
            ${offMenu ? html`<span class="inline-flex items-center gap-1.5">${this.marker('Not in menu')} a real page reached by links, not the menu</span>` : ''}
          </div>
          ${this.zoomControls()}
        </div>

        <section aria-label="Site structure">
          <div id="wf-sitemap-viewport" class="overflow-x-auto pb-6 select-none cursor-grab active:cursor-grabbing"
            @mousedown=${this.onDragStart} @click=${{ handleEvent: this.onClickCapture, capture: true }} @dragstart=${(e: Event) => e.preventDefault()}>
          <div class="overflow-hidden" style=${this.natural.w ? `width:${Math.ceil(this.natural.w * this.scale)}px;height:${Math.ceil(this.natural.h * this.scale)}px` : ''}>
          <div id="wf-sitemap-tree" class="inline-block min-w-max p-2 origin-top-left" style="transform:scale(${this.scale})">
            ${home ? html`
              <div class="relative pb-8">
                ${this.card(home, from)}
                <span class="absolute left-6 bottom-0 h-8 border-l ${LINE}"></span>
              </div>` : ''}
            <div class="flex items-start gap-8">
              ${sections.map((section, i) => html`
                <div class="relative shrink-0 pt-8">
                  <span class="absolute top-0 border-t ${LINE} ${i === sections.length - 1 ? 'left-0 w-6' : i === 0 ? 'left-6 -right-8' : 'left-0 -right-8'}"></span>
                  <span class="absolute left-6 top-0 h-8 border-l ${LINE}"></span>
                  ${this.card(section, from)}
                  ${this.branch(section.children, from)}
                </div>`)}
            </div>
          </div>
          </div>
          </div>
        </section>

        <section class="flex flex-wrap items-start gap-8">
          <div class="w-72 rounded-md border border-gray-300 bg-white overflow-hidden shadow-sm">
            ${this.windowBar()}
            <div class="px-3 py-2.5">
              ${this.tag('Footer')}
              <ul class="mt-2 space-y-1.5">
                ${footer.map((f) => html`
                  <li class="flex items-center justify-between gap-2 text-xs">
                    ${f.node
                      ? html`<a href=${f.node.href} class="font-semibold text-gray-900 hover:underline">${f.label}</a>${this.tag(f.node.type)}`
                      : html`<span class="font-semibold text-gray-900">${f.label}</span>${this.tag('External')}`}
                  </li>`)}
              </ul>
            </div>
          </div>

          ${unplaced.length ? html`
            <div>
              <h2 class="text-sm font-semibold text-gray-900">Unplaced pages</h2>
              <p class="mt-1 max-w-md text-xs text-gray-500">These pages exist but have no breadcrumb parent, menu entry or footer link, so the sitemap can't place them.</p>
              <div class="mt-3 flex flex-wrap gap-4">${unplaced.map((n) => this.card(n, from))}</div>
            </div>` : ''}
        </section>
      </div>`
  }
}
