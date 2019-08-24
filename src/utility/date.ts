import { html } from "lit-element";
import { generateCalendarArr } from "./date-manipulation/calendar";
export const renderCalendarRow = (month: number, year: number) => {
  console.debug(month, year);
  return generateCalendarArr(year, month,{weekStartDay:1,   formatDate: (date:Date) =>date.getDate(), formatSiblingMonthDate: () => '  '}).map(
    (x,index) => html`
      <div class="${getNameForNumberUntilFive(index+1)}-week">
        ${x.map(
          (y:any) =>
            html`
              <div class="day ${typeof y!=='number'?'empty':'filled'}">${y}</div>
            `
        )}
      </div>
    `
  );
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
