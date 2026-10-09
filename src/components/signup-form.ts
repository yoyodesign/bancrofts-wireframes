import { html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { Light } from '../base'

@customElement('wf-signup-form')
export class WfSignupForm extends Light {
  @property() heading = 'Stay in the loop'
  @property() body = 'Get news and updates in your inbox.'
  @property({ attribute: 'submit-label' }) submitLabel = 'Subscribe'

  @state() private submitted = false
  @state() private error = false

  private onSubmit(e: Event) {
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)
    const email = String(data.get('email') || '').trim()
    if (!email || !email.includes('@')) {
      this.error = true
      return
    }
    this.error = false
    this.submitted = true
  }

  render() {
    return html`
      <section class="relative left-1/2 -translate-x-1/2 w-screen bg-gray-100">
        <div class="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900">${this.heading}</h2>
          <p class="mt-2 text-sm text-gray-600">${this.body}</p>
          ${this.submitted
            ? html`<p class="mt-6 text-sm font-medium text-gray-900">You're subscribed! Thanks for signing up.</p>`
            : html`
              <form class="mt-6 mx-auto max-w-md flex flex-col sm:flex-row gap-3" novalidate @submit=${this.onSubmit}>
                <label for="signup-email" class="sr-only">Email address</label>
                <input id="signup-email" name="email" type="email" placeholder="you@example.com"
                  class="min-w-0 flex-1 rounded-lg border ${this.error ? 'border-gray-500' : 'border-gray-300'} px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" />
                <button type="submit"
                  class="rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                  ${this.submitLabel}
                </button>
              </form>
              ${this.error ? html`<p class="mt-2 text-xs text-gray-600">⚠ Enter a valid email address.</p>` : ''}`}
        </div>
      </section>`
  }
}
