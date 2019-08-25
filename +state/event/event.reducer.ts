import { Reducer } from "redux";
import { DateEvent } from './../../src/models/event';
import { EventActionUnion, EVENT_ACTIONS } from "./event.action";
import { persistentReducer } from 'redux-pouchdb-plus';
export interface EventState {
  ids:number[];
  events: DateEvent[];
}

const INITIAL_STATE: EventState = {
    ids:[],
    events:[]
};

const eventReducer: Reducer<EventState, EventActionUnion> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EVENT_ACTIONS.AddEvent:
      return {
        ...state,
        events:[...state.events,action.event],
        ids:[...state.ids,action.event.id]
      };
    case EVENT_ACTIONS.UpdateEvent:
      return {
        ...state,  events:[...state.events,{...state.events.find(x=>x.id===action.event.id),...action.event}],
      };
    case EVENT_ACTIONS.DeleteEvent:
        return {
            ...state,events:state.events.filter(x=>x.id!==action.id),ids:state.ids.filter(x=>x!==action.id)
        }
    default:
      return state;
  }
};

export const reducer=persistentReducer(eventReducer);