import {
  customElement,
  LitElement,
  css,
  property,
  TemplateResult,
  html,
  eventOptions
} from "lit-element";
import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../+state/store";
import { DateEvent, DateIdentifier } from "./../models/event";
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-date-picker';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-form-layout';
@customElement("calrum-event-form")
export class CalrumRootComponent extends connect(store)(LitElement) {
  @property({ type: Date }) date=new Date();
  @property({type:String}) label='';

  static styles = css`
    :host {
      display: block;
    }
  `;
  @eventOptions({ capture: false, passive: true })
  private dateChanged(e: any) {
    this.date =new Date(e.target.value);
  }
  @eventOptions({ capture: false, passive: true })
  private labelChanged(e: any) {
    this.label = e.target.value;
  }
  protected render(): TemplateResult {
    return html`
      <vaadin-form-layout>
        <vaadin-date-picker
          @change="${this.dateChanged}"
          label="Datum"
          value="${this.date}"
        ></vaadin-date-picker>
        <vaadin-text-field
          @change="${this.labelChanged}"
          label="Ereignis"
          value="${this.label ? this.label : ""}"
        ></vaadin-text-field>
        <vaadin-button @click=${() => this.submitEvent()}
          >Speichern</vaadin-button
        >
      </vaadin-form-layout>
    `;
  }
  submitEvent() {
      const dateEvent={id:new DateIdentifier(this.date,"day").identifier as number,date:this.date,label:this.label}
    this.dispatchEvent(
      new CustomEvent<DateEvent>("submitEvent", { detail: dateEvent })
    );
  }
}
