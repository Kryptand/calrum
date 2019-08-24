import "@polymer/iron-icon/iron-icon";
import "@polymer/iron-icons/iron-icons";
import "@vaadin/vaadin-select/vaadin-select";
import "@vaadin/vaadin-text-field/vaadin-number-field";
import {
  customElement,
  eventOptions,
  html,
  LitElement,
  property,
  TemplateResult
} from "lit-element";
import { renderCalendarRow } from "../utility/date";
import { getWeekDaysForWeek } from "../utility/date-manipulation/week";
import { getMonthNamesInYear } from "./../utility/date-manipulation/month";
import { style } from "./month.styles";

@customElement("calrum-month")
export class MonthComponent extends LitElement {
  static get styles() {
    return [style];
  }
  @property({ type: Number }) currentYear = new Date().getFullYear();
  @property({ type: Number }) currentMonth = new Date().getMonth();

  @eventOptions({ capture: false, passive: true })
  private yearChanged(e: any) {
    this.currentYear ==e.target.value;
  }
  @eventOptions({ capture: false, passive: true })
  private monthChanged(e: any) {
    console.debug(e);
    this.currentMonth = new Date(e.target.value).getMonth();
  }
  protected render(): TemplateResult {
    return html`
      <div class="month-indicator">
        <vaadin-number-field
          @change="${this.yearChanged}"
          value="${this.currentYear}"
          id="year"
          has-controls
        ></vaadin-number-field>
        <vaadin-select
          @value-changed="${this.monthChanged}"
          value="${this.currentMonth+1}"
        >
          <template>
            <vaadin-list-box>
              ${getMonthNamesInYear().map(
                (x,index) => html`
                  <vaadin-item value="${index+1}" label="${x}">${x}</vaadin-item>
                `
              )}
            </vaadin-list-box>
          </template>
        </vaadin-select>
      </div>
      <div class="grid-container">
        <div class="weeknames">
          ${getWeekDaysForWeek().map(x=>html`<div>${x}</div>`)}
        </div>
        ${renderCalendarRow(this.currentMonth, this.currentYear)}
      </div>
    `;
  }
}
