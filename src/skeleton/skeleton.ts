import {
  LitElement,
  html,
  customElement,
  css,
  TemplateResult
} from "lit-element";
import "./navbar";
@customElement("calrum-skeleton")
export class SkeletonComponent extends LitElement {
  static styles = css`
    :host {
      display: flex;
    }
    .navbar {
      width: var(--calrum-navbar-width);
      height: var(--calrum-navbar-height);
    }
    .content {
      width: calc(100% - var(--calrum-navbar-width));
    }
  `;
  protected render(): TemplateResult {
    return html`
      <calrum-navbar></calrum-navbar>
      <div class="content">
        <slot name="content"></slot>
      </div>
    `;
  }
}
