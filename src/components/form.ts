import { html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { Light } from '../base'
import { chevronIcon } from './utils'

export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'radio' | 'number'
  options?: string[]
  required?: boolean
  placeholder?: string
  defaultValue?: string
}

/** One selectable form type in a multi-variant wf-form (e.g. Donate's Give Now / Sponsor /
 *  Special Funds). `autoSelectParam`, if present in the URL query string, selects this variant
 *  on load — e.g. a "Sponsor this herd" CTA elsewhere in the site links to
 *  donate.html?sponsorType=Herd#donate-form, which both switches to the Sponsor tab and
 *  pre-fills its sponsorType field via the normal deep-link pre-fill mechanism. */
export interface FormVariant {
  key: string
  tabLabel: string
  heading: string
  intro?: string
  submitLabel: string
  submitId: string
  successHeading?: string
  successBody?: string
  fields: FormField[]
  autoSelectParam?: string
}

@customElement('wf-form')
export class WfForm extends Light {
  @property() heading = ''
  @property() intro = ''
  @property({ attribute: 'submit-label' }) submitLabel = 'Submit'
  @property({ attribute: 'success-heading' }) successHeading = 'Thanks! You\'re all set.'
  @property({ attribute: 'success-body' }) successBody = 'We\'ve received your submission and will be in touch soon.'
  @property({ attribute: false }) fields: FormField[] = []
  /** id used by the walkthrough highlighter to ring the submit button */
  @property({ attribute: 'submit-id' }) submitId = ''
  /** Optional — when set (2+ entries), renders a type selector above the form and swaps the
   *  whole field set/heading/submit when the user picks a different one. See design-system.md
   *  → "Selectable multi-type forms". */
  @property({ attribute: false }) variants: FormVariant[] = []

  @state() private activeVariant = 0
  @state() private submitted = false
  @state() private errors: Record<string, boolean> = {}

  connectedCallback() {
    super.connectedCallback()
    if (this.variants.length) {
      const params = new URLSearchParams(location.search)
      const i = this.variants.findIndex((v) => v.autoSelectParam && params.has(v.autoSelectParam))
      if (i >= 0) this.activeVariant = i
    }
  }

  private selectVariant(i: number) {
    this.activeVariant = i
    this.submitted = false
    this.errors = {}
  }

  private onSubmit(e: Event, fields: FormField[]) {
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)
    const errors: Record<string, boolean> = {}
    for (const f of fields) {
      if (f.required && !String(data.get(f.name) || '').trim()) errors[f.name] = true
    }
    this.errors = errors
    if (Object.keys(errors).length === 0) this.submitted = true
  }

  /** Deep-link pre-fill: a query param matching a field's name overrides its default value
   *  (e.g. donate.html?sponsorType=Horse&frequency=Monthly#donate-form). */
  private urlValue(name: string): string | undefined {
    const v = new URLSearchParams(location.search).get(name)
    return v ?? undefined
  }

  private field(f: FormField) {
    const hasError = this.errors[f.name]
    const base = 'mt-1.5 w-full rounded-lg border px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900'
    const border = hasError ? 'border-gray-500' : 'border-gray-300'
    const urlVal = this.urlValue(f.name)
    const effectiveDefault = urlVal ?? f.defaultValue
    let control
    if (f.type === 'textarea') {
      control = html`<textarea name=${f.name} rows="4" placeholder=${f.placeholder || ''} class="${base} ${border}"></textarea>`
    } else if (f.type === 'select') {
      // appearance-none drops the browser's own native arrow, which renders flush against the
      // border ignoring the field's right padding - swapped for the kit's own chevronIcon instead,
      // positioned to match (see wf-calendar's category filter, which had the same issue).
      control = html`
        <div class="relative">
          <select name=${f.name} class="${base} ${border} appearance-none pr-9">
            <option value="">Select…</option>
            ${(f.options || []).map((o) => html`<option value=${o} ?selected=${o === effectiveDefault}>${o}</option>`)}
          </select>
          <span aria-hidden="true" class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">${chevronIcon(false)}</span>
        </div>`
    } else if (f.type === 'radio') {
      control = html`
        <div class="mt-1.5 flex flex-wrap gap-4">
          ${(f.options || []).map((o, i) => html`
            <label class="inline-flex items-center gap-2 text-sm text-gray-700">
              <input type="radio" name=${f.name} value=${o} ?checked=${effectiveDefault ? o === effectiveDefault : i === 0} class="focus:ring-2 focus:ring-gray-900" /> ${o}
            </label>`)}
        </div>`
    } else {
      control = html`<input type=${f.type} name=${f.name} placeholder=${f.placeholder || ''} value=${effectiveDefault || ''} class="${base} ${border}" />`
    }
    return html`
      <div>
        <label class="text-sm font-medium text-gray-700">${f.label}${f.required ? html` <span aria-hidden="true">*</span>` : ''}</label>
        ${control}
        ${hasError ? html`<p class="mt-1.5 flex items-center gap-1 text-xs text-gray-600"><span aria-hidden="true">⚠</span> ${f.label} is required.</p>` : ''}
      </div>`
  }

  private renderTypeSelector() {
    return html`
      <div class="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Donation type">
        ${this.variants.map((v, i) => html`
          <button type="button" role="tab" aria-selected=${this.activeVariant === i}
            @click=${() => this.selectVariant(i)}
            class="rounded-lg px-5 py-2.5 text-sm font-medium border ${this.activeVariant === i ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}">
            ${v.tabLabel}
          </button>`)}
      </div>`
  }

  render() {
    const usingVariants = this.variants.length > 0
    const active: { heading: string; intro?: string; submitLabel: string; submitId: string; successHeading: string; successBody: string; fields: FormField[] } =
      usingVariants
        ? { ...this.variants[this.activeVariant], successHeading: this.variants[this.activeVariant].successHeading || 'Thanks! You\'re all set.', successBody: this.variants[this.activeVariant].successBody || 'We\'ve received your submission and will be in touch soon.' }
        : { heading: this.heading, intro: this.intro, submitLabel: this.submitLabel, submitId: this.submitId, successHeading: this.successHeading, successBody: this.successBody, fields: this.fields }

    if (this.submitted) {
      return html`
        <section class="max-w-2xl">
          ${usingVariants ? this.renderTypeSelector() : ''}
          <div class="mx-auto text-center rounded-xl border border-gray-200 bg-white p-10">
            <div class="mx-auto h-12 w-12 rounded-full border-2 border-gray-800 flex items-center justify-center">
              <svg class="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg>
            </div>
            <h2 class="mt-4 text-2xl font-semibold text-gray-900">${active.successHeading}</h2>
            <p class="mt-2 text-sm text-gray-600">${active.successBody}</p>
          </div>
        </section>`
    }
    const hasPrefill = active.fields.some((f) => this.urlValue(f.name))
    return html`
      <section class="max-w-2xl">
        ${usingVariants ? this.renderTypeSelector() : ''}
        ${active.heading ? html`<h2 class="text-2xl sm:text-3xl font-semibold text-gray-900">${active.heading}</h2>` : ''}
        ${active.intro ? html`<p class="mt-3 text-base text-gray-600">${active.intro}</p>` : ''}
        ${hasPrefill ? html`
          <p class="mt-4 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-xs text-gray-600">
            We've pre-filled this form based on what you selected.
          </p>` : ''}
        <form class="mt-8 space-y-5" novalidate @submit=${(e: Event) => this.onSubmit(e, active.fields)}>
          ${active.fields.map((f) => this.field(f))}
          <button type="submit" id=${active.submitId || undefined}
            class="w-full sm:w-auto rounded-lg bg-gray-800 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
            ${active.submitLabel}
          </button>
        </form>
      </section>`
  }
}
