import {
  LitElement,
  html,
  customElement,
  css,
  TemplateResult,
  property
} from "lit-element";
import "@polymer/iron-icons/iron-icons";
import "@polymer/iron-icon/iron-icon";
import { connect } from "pwa-helpers/connect-mixin";
import { Routes } from "../config/routes";
import { store } from "../+state/store";

const isCurrentPage: any=(location:string,currentLocation:string)=>{
  return location===currentLocation;
}


@customElement("calrum-navbar")
export class NavbarComponent extends connect(store)(LitElement){ 
  @property({ type: String })
  page = "";
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
      <a href="/${Routes.Home}">
        <iron-icon class="navbar-icon ${isCurrentPage(this.page,Routes.Home)?'active':''}"  icon="icons:date-range"></iron-icon
      ></a>
      <a href="/${Routes.Week}">
        <iron-icon class="navbar-icon  ${isCurrentPage(this.page,Routes.Week)?'active':''}" icon="icons:view-list"></iron-icon>
      </a>
      <a href="/${Routes.Month}">
        <iron-icon class="navbar-icon  ${isCurrentPage(this.page,Routes.Month)?'active':''}" icon="icons:view-module"></iron-icon>
      </a>
    `;
  }
}
