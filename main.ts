import { LitElement, html, customElement, TemplateResult } from "lit-element";
import "./src/skeleton/skeleton";
@customElement("calrum-root")
export class CalrumRootComponent extends LitElement {
  protected render(): TemplateResult {
    return html`
      <calrum-skeleton>
        <div slot="content">Hello its me</div>
      </calrum-skeleton>
    `;
  }
}
