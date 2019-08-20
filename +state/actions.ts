import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./store";
export const UPDATE_PAGE = "UPDATE_PAGE";
export const UPDATE_OFFLINE = "UPDATE_OFFLINE";

export interface AppActionUpdatePage extends Action<"UPDATE_PAGE"> {
  page: string;
}
export interface AppActionUpdateOffline extends Action<"UPDATE_OFFLINE"> {
  offline: boolean;
}

export type AppAction = AppActionUpdatePage | AppActionUpdateOffline;

type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>;



export const updateOffline: ActionCreator<ThunkResult> = (offline: boolean) => (
  dispatch,
  getState
) => {
  if (offline !== getState().app!.offline) {
    console.debug('offline');
  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline
  });
};
