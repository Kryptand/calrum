import {
  LitElement,
  html,
  customElement,
  css,
  TemplateResult,
  property,
  eventOptions
} from "lit-element";
import "@polymer/iron-icons/iron-icons";
import "@polymer/iron-icon/iron-icon";
import "@vaadin/vaadin-text-field/vaadin-number-field";
import "@vaadin/vaadin-select/vaadin-select";
import moment from "moment";
import {
  getDayName,
  renderCalendarRow,
  getMonthNames
} from "../utility/date";
@customElement("calrum-month")
export class MonthComponent extends LitElement {
  static styles = css`
    .day-of-week {
      display: flex;
      width: 100%;
    }
    html,
    body,
    .grid-container {
      height: calc(100vh - 55px);
      margin: 0;
    }

    .grid-container * {
     
      border: 1px solid red;
      position: relative;
    }
    .month-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-template-rows:  1fr  1fr  1fr 1fr 1fr 1fr  1fr;
      grid-template-areas: "weeknames weeknames weeknames weeknames weeknames weeknames weeknames" "first-week first-week first-week first-week first-week first-week first-week" "second-week second-week second-week second-week second-week second-week second-week" "third-week third-week third-week third-week third-week third-week third-week" "fourth-week fourth-week fourth-week fourth-week fourth-week fourth-week fourth-week" "fifth-week fifth-week fifth-week fifth-week fifth-week fifth-week fifth-week" "sixth-week sixth-week sixth-week sixth-week sixth-week sixth-week sixth-week";
    }

    .weeknames {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-template-rows: 1fr;
      grid-template-areas: ". . . . . . .";
      grid-area: weeknames;
    }

    .first-week {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-template-rows: ;
      grid-template-areas: ". . . . . . .";
      grid-area: first-week;
    }

    .second-week {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-template-rows: ;
      grid-template-areas: ". . . . . . .";
      grid-area: second-week;
    }

    .third-week {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-template-rows: ;
      grid-template-areas: ". . . . . . .";
      grid-area: third-week;
    }

    .fourth-week {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-template-rows: ;
      grid-template-areas: ". . . . . . .";
      grid-area: fourth-week;
    }

    .fifth-week {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-template-rows: ;
      grid-template-areas: ". . . . . . .";
      grid-area: fifth-week;
    }
    
    .sixth-week {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-template-rows: ;
      grid-template-areas: ". . . . . . .";
      grid-area: sixth-week;
    }
    #year {
      margin: 5px;
    }
  `;
  @property({ type: Number }) currentYear = moment().year();
  @property({ type: Number }) currentMonth = moment().month();

  @eventOptions({ capture: false, passive: true })
  private yearChanged(e: any) {
    this.currentYear = e.target.value;
  }
  @eventOptions({ capture: false, passive: true })
  private monthChanged(e: any) {
    console.debug(e);
    this.currentMonth = e.target.value;
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
          value="${moment()
            .month(this.currentMonth)
            .format("MMMM")}"
        >
          <template>
            <vaadin-list-box>
              ${getMonthNames()}
            </vaadin-list-box>
          </template>
        </vaadin-select>
      </div>
      <div class="grid-container">
        <div class="weeknames">
          ${getDayName()}
        </div>
        ${renderCalendarRow(this.currentMonth, this.currentYear)}
      </div>
    `;
  }
}
