import { html } from "lit-element";
import moment, { Moment } from "moment";
export const getMonthNames = () => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    .map(month =>
      moment()
        .month(month)
        .format("MMMM")
    )
    .map(
      month => html`
        <vaadin-item>${month}</vaadin-item>
      `
    );
};
export const getDayName = () => {
  return [0, 1, 2, 3, 4, 5, 6]
    .map(day =>
      moment()
        .weekday(day)
        .format("dddd")
    )
    .map(
      dayname => html`
        <div>${dayname}</div>
      `
    );
};
export const daysInMonth = (month: number): number => {
  return moment()
    .month(month)
    .daysInMonth();
};

export const renderCalendarRow = (month: number, year: number) => {
  console.debug(month, year);
  return weekDays(month, year).map(
    x => html`
      <div class="${getNameForNumberUntilFive(x.week)}-week">
        ${x.days.map(
          day =>
            html`
              <div class="day">${day.format("DD")}</div>
            `
        )}
      </div>
    `
  );
};
export const weekDays = (
  month: number,
  year: number
): { week: number; days: Moment[] }[] => {
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
  for (var week = startWeek; week <= endWeek; week++) {
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
  console.debug(calendar);
  return calendar;
};

export const getNameForNumberUntilFive = (num: number): string => {
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
    case 6:
      return "sixth";
    default:
      return "";
  }
};
