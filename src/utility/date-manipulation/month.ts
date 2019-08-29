export const getMonthNameForNumber = (
  month: number,
  locale: string | string[] = "default"
): string => {
  const objDate = new Date();
  objDate.setDate(1);
  objDate.setMonth(month);
  objDate.toLocaleString(locale, { month: "long" });
  return objDate.toLocaleString(locale, { month: "long" });
};

export const getMonthNamesInYear = (): string[] => {
  return [0,1,2,3,4,5,6,7,8,9,10,11].map(month =>
    getMonthNameForNumber(month)
  );
};

export const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate();
};

export const firstOfMonth = (year: number, month: number): Date => {
  return new Date(year, month - 1, 1);
};
export const lastOfMonth = (year: number, month: number): Date => {
  return new Date(year, month, 0);
};
