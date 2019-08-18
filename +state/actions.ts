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

export const navigate: ActionCreator<ThunkResult> = (
  path: string
) => dispatch => {
  // Extract the page name from path.
  const page = path === "/" ? "home" : path.slice(1);

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page));
};

const loadPage: ActionCreator<ThunkResult> = (
  page: string
) => async dispatch => {
  switch (page) {
    case "home":
      await import("../src/home/home");
      break;
    case "week":
      await import("../src/week/week");
      break;
    case "month":
      await import("../src/month/month");
      break;
    case "day-list":
      await import("../src/day-list/day-list");
      break;
    default:
      page = "view404";
      await import("../src/not-found/not-found");
  }

  dispatch(updatePage(page));
};

const updatePage: ActionCreator<AppActionUpdatePage> = (page: string) => {
  return {
    type: UPDATE_PAGE,
    page
  };
};

export const updateOffline: ActionCreator<ThunkResult> = (offline: boolean) => (
  dispatch,
  getState
) => {
  // Show the snackbar only if offline status changes.
  if (offline !== getState().app!.offline) {
  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline
  });
};
