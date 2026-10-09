import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Light } from '../base'

interface Crumb { label: string; href: string }

@customElement('wf-page-header')
export class WfPageHeader extends Light {
  @property() heading = ''
  @property() subtitle = ''
  @property({ attribute: false }) breadcrumb: Crumb[] = []

  render() {
    return html`
      <section class="max-w-3xl">
        ${this.breadcrumb?.length ? html`
          <nav aria-label="Breadcrumb" class="mb-4">
            <ol class="flex flex-wrap items-center gap-1 text-xs text-gray-500">
              ${this.breadcrumb.map((c, i) => html`
                <li class="flex items-center gap-1">
                  ${i > 0 ? html`<span aria-hidden="true">/</span>` : ''}
                  ${i === this.breadcrumb.length - 1
                    ? html`<span aria-current="page" class="text-gray-700">${c.label}</span>`
                    : html`<a href=${c.href} class="hover:text-gray-900">${c.label}</a>`}
                </li>`)}
            </ol>
          </nav>` : ''}
        <h1 class="text-3xl sm:text-4xl font-semibold text-gray-900">${this.heading}</h1>
        ${this.subtitle ? html`<p class="mt-3 text-base text-gray-600">${this.subtitle}</p>` : ''}
      </section>`
  }
}
