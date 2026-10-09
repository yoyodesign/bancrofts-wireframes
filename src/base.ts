import { LitElement } from 'lit'
/** Base for all blocks: render into LIGHT DOM so global Tailwind utilities apply,
 *  and default the host to display:block (custom elements are inline otherwise). */
export class Light extends LitElement {
  createRenderRoot() { return this }
  connectedCallback() { super.connectedCallback(); if (!this.style.display) this.style.display = 'block' }
}
