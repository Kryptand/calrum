import { Action } from "redux";
import { DateEvent } from "../../models/event";
export const enum EVENT_ACTIONS {
  AddEvent = "[Event] Add",
  DeleteEvent = "[Event] Delete",
  UpdateEvent = "[Event] Update"
}
export interface AddEventAction extends Action<EVENT_ACTIONS.AddEvent> {
  event: DateEvent;
}

export interface DeleteEventAction extends Action<EVENT_ACTIONS.DeleteEvent> {
  id: number;
}
export interface UpdateEventAction extends Action<EVENT_ACTIONS.UpdateEvent> {
  event: DateEvent;
}
export type EventActionUnion =
  | AddEventAction
  | UpdateEventAction
  | DeleteEventAction;

export const addEvent = (event: DateEvent) => (
  dispatch: any,
  getState: any
) => {
    getState;
  dispatch({
    type: EVENT_ACTIONS.AddEvent,
    event
  });
};
