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
import moment, { Moment } from "moment";

const getMonthname = () => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    .map(month =>
      moment()
        .month(month)
        .format("MMMM")
    )
    .map(
      month =>
        html`
          <vaadin-item>${month}</vaadin-item>
        `
    );
};
const getNameForNumberUntilFive = (num: number): string => {
  console.debug(num);
  switch (num) {
    case 1:
      return "first";
    case 2:
      return "second";
    case 3:
      return "third";
    case 4:
      return "fourth";
    case 5:
      return "fifth";
    default:
      return "";
  }
};
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
      height: 100%;
      margin: 0;
    }

    .grid-container * {
      border: 1px solid red;
      position: relative;
    }

  

    .grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-template-areas: "weeknames weeknames weeknames weeknames weeknames weeknames weeknames" "first-week first-week first-week first-week first-week first-week first-week" "second-week second-week second-week second-week second-week second-week second-week" "third-week third-week third-week third-week third-week third-week third-week" "fourth-week fourth-week fourth-week fourth-week fourth-week fourth-week fourth-week" "fifth-week fifth-week fifth-week fifth-week fifth-week fifth-week fifth-week";
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
  `;
  @property({ type: Number }) currentYear = moment().year();
  @property({ type: Number }) currentMonth = moment().month();
  private daysInMonth(month: number): number {
    return moment()
      .month(month)
      .daysInMonth();
  }

  private weekDays(
    month: number,
    year: number
  ): { week: number; days: Moment[] }[] {
    console.debug("change");
    const startWeek = moment()
      .set({ year: year, month: month })
      .startOf("month")
      .week();
    const endWeek = moment()
      .set({ year: year, month: month })
      .endOf("month")
      .week();
    let calendar = [];
    let index = 1;
    for (var week = startWeek; week < endWeek; week++) {
      calendar.push({
        week: index,
        days: Array(7)
          .fill(0)
          .map((n, i) =>
            moment()
              .week(week)
              .startOf("week")
              .clone()
              .add(n + i, "day")
          )
      });
      index++;
    }
    return calendar;
  }
  private getDayName() {
    return [0, 1, 2, 3, 4, 5, 6]
      .map(day =>
        moment()
          .weekday(day)
          .format("dddd")
      )
      .map(
        dayname =>
          html`
            <div>${dayname}</div>
          `
      );
  }
  private renderCalendarRow(month: number, year: number) {
    console.debug(month, year);
    return this.weekDays(month, year).map(
      x => html`
        <div class="${getNameForNumberUntilFive(x.week)}-week">
          ${x.days.map(
            day =>
              html`
                <div class="day">${day.format("DD")}</div>
              `)}
        </div>
      `
    );
  }

  @eventOptions({ capture: false, passive: true })
  private yearChanged(e: any) {
    this.currentYear = e.target.value;
  }
  @eventOptions({ capture: false, passive: true })
  private monthChanged(e: any) {
    this.currentMonth = e.target.value;
  }
  protected render(): TemplateResult {
    return html`
      <div class="month-indicator">
        <vaadin-number-field
          @change="${this.yearChanged}"
          value="${this.currentYear}"
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
              ${getMonthname()}
            </vaadin-list-box>
          </template>
        </vaadin-select>
      </div>
      <div class="grid-container">
        <div class="weeknames">
          ${this.getDayName()}
        </div>
        ${this.renderCalendarRow(this.currentMonth, this.currentYear)}
      </div>
      ${this.daysInMonth(this.currentMonth)}
    `;
  }
}
