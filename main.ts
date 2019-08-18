import {
  LitElement,
  html,
  customElement,
  TemplateResult,
  property,
  PropertyValues
} from "lit-element";
import "@polymer/app-layout/app-scroll-effects/effects/waterfall.js";
import { setPassiveTouchGestures } from "@polymer/polymer/lib/utils/settings.js";
import { connect } from "pwa-helpers/connect-mixin.js";

import { installOfflineWatcher } from "pwa-helpers/network.js";
import { installRouter } from "pwa-helpers/router.js";
import { updateMetadata } from "pwa-helpers/metadata.js";
import { store, RootState } from "./+state/store";

import "./src/skeleton/skeleton";
import { navigate, updateOffline } from "./+state/actions";
@customElement("calrum-root")
export class CalrumRootComponent extends connect(store)(LitElement) {
  @property({ type: String })
  appTitle = "Calrum";
  @property({ type: String })
  page = "asd";
  @property({ type: Boolean })
  offline = false;

  constructor() {
    super();
    setPassiveTouchGestures(true);
  }

  protected firstUpdated() {
    installRouter(location =>
      store.dispatch(navigate(decodeURIComponent(location.pathname)))
    );
    installOfflineWatcher(offline => store.dispatch(updateOffline(offline)));
  }

  protected updated(changedProps: PropertyValues) {
    if (changedProps.has("page")) {
      const pageTitle = this.appTitle + " - " + this.page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      });
    }
  }

  stateChanged(state: RootState) {
    this.page = state.app!.page;
    this.offline = state.app!.offline;
  }

  protected render(): TemplateResult {
    return html`
      bal ${this.page}
      <calrum-skeleton condenses reveals effects="waterfall">
        <main id="outlet" role="main router-outlet" slot="content">
          <calrum-home
            class="page"
            ?active="${this.page === "home"}"
          ></calrum-home>
          <calrum-week
            class="page"
            ?active="${this.page === "week"}"
          ></calrum-week>
          <calrum-month
            class="page"
            ?active="${this.page === "month"}"
          ></calrum-month>
          <calrum-not-found
            class="page"
            ?active="${this.page === "view404"}"
          ></calrum-not-found>
        </main>
      </calrum-skeleton>
      ${this.offline}
    `;
  }
}
