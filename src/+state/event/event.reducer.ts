import { Reducer } from "redux";
import { createSelector } from 'reselect';
import { DateEvent, DateIdentifier } from "../../models/event";
import { EventActionUnion, EVENT_ACTIONS } from "./event.action";


export interface EventState {
  ids:number[];
  events: DateEvent[];
}

const INITIAL_STATE: EventState = {
    ids:[],
    events:[]
};

export const eventReducer: Reducer<EventState, EventActionUnion> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EVENT_ACTIONS.AddEvent:
    const ids= state.ids.filter(x=>x!==action.event.id); 
    return {
        ...state,
        events:[...state.events,action.event],
      
        ids:[...ids,action.event.id]
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

export const getEventsSelector=(state: EventState)=>state.events;
export const getEventsForDate=(event:Date)=>{
  return createSelector(
    getEventsSelector,
  (state:any)=>{

      const id=new DateIdentifier(event).identifier;
      return state.events.filter((x: { id: number | undefined; })=>x.id===id);
    }
 
  )};
