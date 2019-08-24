

export const getWeekDayAsString = (
  day: number,
  long: boolean = true,
  locale: string | string[] = "default"
) => {
  const objDate = new Date();
  objDate.setDate(day);
  return objDate.toLocaleString(locale, { weekday: long ? "long" : "short" });
};

export const getWeekDaysForWeek = (
  long: boolean = true,
  locale: string | string[] = "default"
) => {
  const baseDate = new Date(Date.UTC(2017, 0, 2));
  let weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(
      baseDate.toLocaleDateString(locale, { weekday: long ? "long" : "short" })
    );
    baseDate.setDate(baseDate.getDate() + 1);
  }
  return weekDays;
};
