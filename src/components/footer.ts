import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Light } from '../base'
import { footerColumns, footerTagline, footerLegal, siteName } from '../config'

@customElement('wf-site-footer')
export class WfSiteFooter extends Light {
  render() {
    return html`
      <footer class="mt-20 border-t border-gray-200 bg-white">
        <div class="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-14">
          <div class="grid gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr]">
            <div>
              <a href="index.html" class="text-base font-semibold text-gray-900">${siteName}</a>
              <p class="mt-3 max-w-xs text-sm text-gray-500">${footerTagline}</p>
              <form class="mt-5 max-w-sm" @submit=${(e: Event) => e.preventDefault()}>
                <label for="footer-subscribe" class="text-xs font-medium text-gray-700">Subscribe for updates</label>
                <div class="mt-1.5 flex gap-2">
                  <input id="footer-subscribe" type="email" placeholder="you@example.com" required
                    class="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" />
                  <button type="submit"
                    class="rounded-lg bg-gray-800 px-3.5 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
            ${footerColumns.map((col) => html`
              <div>
                <h3 class="text-xs font-semibold uppercase tracking-wide text-gray-400">${col.heading}</h3>
                <ul class="mt-3 space-y-2">
                  ${col.links.map((l) => html`<li><a href=${l.href} class="text-sm text-gray-600 hover:text-gray-900">${l.label}</a></li>`)}
                </ul>
              </div>
            `)}
          </div>
          <div class="mt-12 border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p class="text-xs text-gray-400">&copy; ${new Date().getFullYear()} ${footerLegal}</p>
            <a href="privacy-policy.html" class="text-xs text-gray-500 hover:text-gray-900">Privacy Policy</a>
          </div>
        </div>
      </footer>`
  }
}
