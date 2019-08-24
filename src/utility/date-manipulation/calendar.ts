export interface CalendarOptions {
  weekStartDay: number;
  formatHeader: string;
  formatDate: string;
  formatSiblingMonthDate: string;
}
export const checkSiblingMonth = (day: number, lastDay: number) => {
  return day <= 0 ? -1 : day > lastDay ? 1 : 0;
};

export const offsetDate = (date: Date, offset: number) => {
  const newDate = new Date(date);
  newDate.setDate(offset);
  return newDate;
};
export const generateCalendarArr = (
  year: number,
  month: number,
  opts: CalendarOptions | any = {}
) => {
  let startDate = new Date(year, month);
  if (!startDate) startDate = new Date();

  if (!opts) opts = {};
  const formatDate =
    opts.formatDate ||
    function(date: any) {
      return date;
    };
  const formatSiblingMonthDate = opts.formatSiblingMonthDate || formatDate;
  const weekStartDay = opts.weekStartDay || 0;

  const first = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  const last = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

  const monthFirstDayPosition = (7 + first.getDay() - weekStartDay) % 7;
  const calendarLastDay = last.getDate() + monthFirstDayPosition;
  const weeks = Math.ceil(calendarLastDay / 7);
  const lines = new Array(weeks);
  const headers = new Array(7);
  let dayOfMonth = 1 - monthFirstDayPosition;

  for (let w = 0; w < weeks; w++) {
    const row = new Array(7);
    for (let d = 0; d < 7; d++) {
      const date = offsetDate(first, dayOfMonth);
      const siblingMonth = checkSiblingMonth(dayOfMonth, last.getDate());
      const format = siblingMonth ? formatSiblingMonthDate : formatDate;

      row[d] = format(date, {
        dayOfMonth: dayOfMonth,
        siblingMonth: siblingMonth,
        week: w,
        position: d
      });

      if (opts.formatHeader && w === 0) headers[d] = opts.formatHeader(date, d);

      dayOfMonth++;
    }
    lines[w] = row;
  }

  if (opts.formatHeader) lines.unshift(headers);

  return lines;
};
