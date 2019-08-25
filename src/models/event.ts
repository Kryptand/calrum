export type IdentifierPrecision = "day" | "seconds";
export class DateIdentifier {
  identifier: number | undefined;
  constructor(date: Date, precision: IdentifierPrecision = "day") {
    const isMinutelyPrecise = precision === "day";
    const impreciseDate = new Date(date.setHours(0, 0, 0, 0));
    if (isMinutelyPrecise) {
      this.identifier = date.valueOf();
    }
    this.identifier = impreciseDate.valueOf();
  }
  static compare(id1: DateIdentifier, id2: DateIdentifier): boolean {
    return id1.identifier === id2.identifier;
  }
  toString(): string {
    return this.identifier + "";
  }
}
export interface DateEvent {
  id:number;
  date: Date;
  label: string;
}
export type EventGroup =Map<number,DateEvent[]>;
export const eventToEventGroupArrFactory=(precision:IdentifierPrecision='day',...events:DateEvent[]):EventGroup=>{
   return events.reduce((map,item)=>{
        const identifier=new DateIdentifier(item.date,precision);
        if (map.has(identifier)) map.get(identifier).push(item);
        else map.set(identifier, [item]);
        return map;
    },new Map())
}