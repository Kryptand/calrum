import {
  LitElement,
  html,
  customElement,
  css,
  TemplateResult
} from "lit-element";
import "@polymer/iron-icons/iron-icons";
import "@polymer/iron-icon/iron-icon";
import moment, { Moment } from 'moment';

@customElement("calrum-month")
export class MonthComponent extends LitElement {
  static styles = css`
  .day-of-week{
    display:flex;
    width:100%;
  }

  `;
  private daysInMonth():number{
    console.debug(this.weekDays(moment().month(),moment().year()))
  return moment().daysInMonth();
  }

 private weekDays(month:number, year:number):{week:number,days:Moment[]}[] {
    const startWeek = moment().set({'year': year, 'month': month}).startOf('month').week();
    const endWeek =moment().set({'year': year, 'month': month}).endOf('month').week();
    let calendar = []
    for(var week = startWeek; week<endWeek;week++){
      calendar.push({
        week:week,
        days:Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(n + i, 'day'))
      })}
      return calendar;
  }
  private renderCalendarRow(weekName:number,dates:Moment[]){
    return html`
    <div class="row ${weekName}">
      ${dates.map(x=>x.format('DD'))}
    </div>
    `;
  }
  protected render(): TemplateResult {
    return html` <div class="calendar">
    <div class="month-indicator">
      <time datetime="2019-02"> ${moment().format('MMMM YYYY')} </time>
    </div>
    <div class="day-of-week">
      <div>Su</div>
      <div>Mo</div>
      <div>Tu</div>
      <div>We</div>
      <div>Th</div>
      <div>Fr</div>
      <div>Sa</div>
    </div>
    ${this.weekDays(moment().month(),moment().year()).map(x=>this.renderCalendarRow(x.week,x.days))}
  </div>
      ${this.daysInMonth()}
    `;
  }
}
