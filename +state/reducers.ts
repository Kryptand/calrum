import { Reducer } from "redux";
import { RootAction } from "./store";
import { UPDATE_PAGE, UPDATE_OFFLINE } from "./actions";

export interface AppState {
  page: string;
  offline: boolean;
  drawerOpened: boolean;
  snackbarOpened: boolean;
}

const INITIAL_STATE: AppState = {
  page: "",
  offline: false,
  drawerOpened: false,
  snackbarOpened: false
};

const app: Reducer<AppState, RootAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page
      };
    case UPDATE_OFFLINE:
      return {
        ...state,
        offline: action.offline
      };

    default:
      return state;
  }
};

export default app;
