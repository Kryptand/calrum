import {
  LitElement,
  html,
  customElement,
  css,
  TemplateResult
} from "lit-element";
import "@polymer/iron-icons/iron-icons";
import "@polymer/iron-icon/iron-icon";

@customElement("calrum-navbar")
export class NavbarComponent extends LitElement {
  static styles = css`
    :host {
      width: var(--calrum-navbar-width);
      height: var(--calrum-navbar-height);
      background-color: var(--calrum-on-background);
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
    }
    .navbar-icon {
      width: 100%;
      height: auto;
      max-width: 70px;
      color: var(--calrum-primary-contrast);
    }
  `;
  protected render(): TemplateResult {
    return html`
      <iron-icon class="navbar-icon" icon="icons:date-range"></iron-icon>
      <iron-icon class="navbar-icon" icon="icons:view-list"></iron-icon>
      <iron-icon class="navbar-icon" icon="icons:view-module"></iron-icon>
    `;
  }
}
