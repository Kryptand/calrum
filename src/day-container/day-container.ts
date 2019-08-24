import {
    LitElement,
    html,
    customElement,
    css,
    TemplateResult
  } from "lit-element";
  import "@polymer/iron-icons/iron-icons";
  import "@polymer/iron-icon/iron-icon";
  
  @customElement("calrum-day-container")
  export class NotFoundComponent extends LitElement {
    static styles = css`
     
    `;
    protected render(): TemplateResult {
      return html`
        <h1>Home</h1>
        The pathname was: ${window.location.pathname}
      `;
    }
  }
  