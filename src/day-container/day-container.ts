import { css, customElement, html, LitElement, property, TemplateResult } from "lit-element";
import { connect } from "pwa-helpers/connect-mixin";
import { getEventsSelector } from "../+state/event/event.reducer";
import { RootState, store } from "../+state/store";
import { DateEvent, DateIdentifier } from "../models/event";
@customElement("calrum-day-container")
export class DayContainerComponent extends connect(store)(LitElement) {
  @property({ type: Date }) date = new Date();
  @property({ type: Array }) events: DateEvent[] = [];

  stateChanged(state: RootState) {
    if(this.date){
    const id = new DateIdentifier(this.date).identifier;
    console.debug(getEventsSelector(state.event));
    this.events = getEventsSelector(state.event).filter(x => x.id === id);    
  }
  }
  private renderEvent(): TemplateResult[] {
    return this.events.map(x =>  html` <div class="event">${x.label}</div>`);
  }
  protected render(): TemplateResult {
    return html`
    ${new Date(this.date).getDate()}
      ${this.renderEvent()}
    `;
  }
}

