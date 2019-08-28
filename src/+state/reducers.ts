import { Reducer } from "redux";
import { RootAction } from "./store";

export interface AppState{

}
export const INITIAL_STATE:AppState={

}
export const appReducer: Reducer<AppState, RootAction> = (state = INITIAL_STATE, _) => 
{
      return state;
};
