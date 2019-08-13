import { LitElement, html, property, customElement } from "lit-element";

@customElement("calrum-root")
export class CalrumRoot extends LitElement {
    
  protected render() {
    return html`
      <h1>Hello Calrum</h1>
    `;
  }
}
