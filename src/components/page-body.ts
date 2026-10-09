import { html, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Light } from '../base'
import { pages } from '../config'
import type { Block } from '../config'

/** Renders a page's hero + block sequence from src/config.ts — a page is data, not hand-written markup. */
@customElement('wf-page-body')
export class WfPageBody extends Light {
  @property() page = ''

  private renderHero(hero?: Block): TemplateResult | '' {
    if (!hero) return ''
    const p = hero.props || {}
    switch (hero.component) {
      case 'wf-homepage-hero':
        return html`<wf-homepage-hero heading=${p.heading} body=${p.body}
          cta-label=${p.ctaLabel} cta-href=${p.ctaHref} cta-id=${p.ctaId || ''}></wf-homepage-hero>`
      case 'wf-standard-hero':
        return html`<wf-standard-hero eyebrow=${p.eyebrow || ''} heading=${p.heading} body=${p.body || ''}
          cta-label=${p.ctaLabel || ''} cta-href=${p.ctaHref || ''} cta-id=${p.ctaId || ''}
          secondary-label=${p.secondaryLabel || ''} secondary-href=${p.secondaryHref || '#'}
          media-label=${p.mediaLabel || 'Section image'} .breadcrumb=${p.breadcrumb || []}></wf-standard-hero>`
      case 'wf-page-header':
        return html`<wf-page-header heading=${p.heading} subtitle=${p.subtitle || ''} .breadcrumb=${p.breadcrumb || []}></wf-page-header>`
      default:
        return ''
    }
  }

  private renderBlock(block: Block): TemplateResult | '' {
    const p = block.props || {}
    switch (block.component) {
      case 'wf-text':
        return html`<wf-text heading=${p.heading || ''} .body=${p.body || []} align=${p.align || 'left'} ?centered=${!!p.centered}></wf-text>`
      case 'wf-text-media':
        return html`<wf-text-media heading=${p.heading || ''} .body=${p.body || []} side=${p.side || 'left'}
          media-label=${p.mediaLabel || 'Section image'} .links=${p.links || []}
          cta-label=${p.ctaLabel || ''} cta-href=${p.ctaHref || '#'} cta-id=${p.ctaId || ''} secondary-label=${p.secondaryLabel || ''} secondary-href=${p.secondaryHref || '#'}></wf-text-media>`
      case 'wf-media':
        return html`<wf-media type=${p.type || 'image'} label=${p.label || 'Media'} caption=${p.caption || ''} aspect-class=${p.aspectClass || 'aspect-video'} ?centered=${!!p.centered}></wf-media>`
      case 'wf-quote':
        return html`<wf-quote .items=${p.items || []}></wf-quote>`
      case 'wf-logos':
        return html`<wf-logos heading=${p.heading || ''} .names=${p.names || []}></wf-logos>`
      case 'wf-statistics':
        return html`<wf-statistics heading=${p.heading || ''} .items=${p.items || []}></wf-statistics>`
      case 'wf-table':
        return html`<wf-table heading=${p.heading || ''} row-header=${p.rowHeader || ''} .columns=${p.columns || []} .rows=${p.rows || []}></wf-table>`
      case 'wf-calendar':
        return html`<wf-calendar heading=${p.heading || ''} .filters=${p.filters || []} .events=${p.events || []} initial-month=${p.initialMonth || ''}></wf-calendar>`
      case 'wf-cards':
        return html`<wf-cards heading=${p.heading || ''} .items=${p.items || []} .filters=${p.filters || []} cols=${p.cols || 4} per-page=${p.perPage || 0}></wf-cards>`
      case 'wf-timeline':
        return html`<wf-timeline heading=${p.heading || ''} .items=${p.items || []}></wf-timeline>`
      case 'wf-button-row':
        // Inline, not a separate wf-* component: a plain row of primary-style buttons for a short
        // list of same-weight links with no supporting description (e.g. "More sports"). Replaces
        // wf-links, which was removed from the kit — see PROTOTYPE.md. A link WITH a description
        // belongs on wf-cards instead, which every other former wf-links usage was converted to.
        return html`
          <section>
            ${p.heading ? html`<h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">${p.heading}</h2>` : ''}
            <div class="flex flex-wrap gap-3">
              ${(p.items || []).map((l: { href: string; label: string }) => html`
                <a href=${l.href}
                  class="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2">
                  ${l.label}
                </a>`)}
            </div>
          </section>`
      case 'wf-form':
        return html`<wf-form heading=${p.heading || ''} intro=${p.intro || ''} submit-label=${p.submitLabel || 'Submit'}
          success-heading=${p.successHeading || undefined} success-body=${p.successBody || undefined}
          .fields=${p.fields || []} submit-id=${p.submitId || ''} .variants=${p.variants || []}></wf-form>`
      case 'wf-signup-form':
        return html`<wf-signup-form heading=${p.heading || undefined} body=${p.body || undefined} submit-label=${p.submitLabel || undefined}></wf-signup-form>`
      case 'wf-promo':
        return html`<wf-promo heading=${p.heading || ''} body=${p.body || ''}
          cta-label=${p.ctaLabel || ''} cta-href=${p.ctaHref || ''} cta-id=${p.ctaId || ''} media-label=${p.mediaLabel || 'Promo image'}></wf-promo>`
      case 'wf-accordion':
        return html`<wf-accordion heading=${p.heading || ''} .items=${p.items || []} ?multi-open=${!!p.multiOpen}></wf-accordion>`
      case 'wf-share':
        return html`<wf-share heading=${p.heading || undefined} ?centered=${!!p.centered}></wf-share>`
      default:
        return ''
    }
  }

  render() {
    const page = pages[this.page]
    if (!page) {
      return html`<div class="py-24 text-center text-gray-500">Page not found: ${this.page}</div>`
    }
    return html`
      <div class="space-y-16 sm:space-y-20 pb-4">
        ${this.renderHero(page.hero)}
        ${page.blocks.map((block) =>
          block.anchorId
            ? html`<div id=${block.anchorId} class="scroll-mt-24">${this.renderBlock(block)}</div>`
            : this.renderBlock(block)
        )}
      </div>`
  }
}
