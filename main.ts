import "@polymer/app-layout/app-scroll-effects/effects/waterfall.js";
import { setPassiveTouchGestures } from "@polymer/polymer/lib/utils/settings.js";
import {
  customElement,
  html,
  LitElement,
  property,
  PropertyValues,
  TemplateResult,
  css
} from "lit-element";
import { connect } from "pwa-helpers/connect-mixin.js";
import { updateMetadata } from "pwa-helpers/metadata.js";
import { installOfflineWatcher } from "pwa-helpers/network.js";

import {  updateOffline } from "./+state/actions";
import { RootState, store } from "./+state/store";
import "./src/skeleton/skeleton";
import * as fromRouter from "./router";

@customElement("calrum-root")
export class CalrumRootComponent extends connect(store)(LitElement) {
  static styles = css`
  main{
    height:100%;
  }
  `;
  @property({ type: String })
  appTitle = "Calrum";
  @property({ type: String })
  page = "";
  @property({ type: Boolean })
  offline = false;

  constructor() {
    super();
    setPassiveTouchGestures(true);
  }

  protected firstUpdated() {
    if (this.shadowRoot !== null) {
      fromRouter.init(this.shadowRoot.querySelector("main"));
    }
    installOfflineWatcher(offline => store.dispatch(updateOffline(offline)));
  }

  protected updated(changedProps: PropertyValues) {
    if (changedProps.has("page")) {
      const pageTitle = this.appTitle + " - " + this.page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
      });
    }
  }

  stateChanged(state: RootState) {
    console.debug(state);
    this.page = state.app!.page;
    this.offline = state.app!.offline;
  }

  protected render(): TemplateResult {
    return html`
      <calrum-skeleton condenses reveals effects="waterfall">
        <main id="outlet" role="main router-outlet" slot="content"></main>
      </calrum-skeleton>
    `;
  }
}
