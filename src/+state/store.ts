declare global {
  interface Window {
    process?: Object;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';
import localForage from "localforage";
import {
  applyMiddleware,
  compose,
  createStore,
  StoreEnhancer,
  combineReducers
} from "redux";
import { PersistConfig,  persistReducer } from "redux-persist";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { EventActionUnion } from "./event/event.action";
import { EventState, eventReducer } from "./event/event.reducer";
import { AppState, appReducer } from "./reducers";

localForage.config({
  name: "Calrum",
  storeName: "main"
});
// Overall state extends static states and partials lazy states.
export interface RootState {
  app?: AppState;
  event: EventState;
}

export type RootAction = EventActionUnion;

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose: <Ext0, Ext1, StateExt0, StateExt1>(
  f1: StoreEnhancer<Ext0, StateExt0>,
  f2: StoreEnhancer<Ext1, StateExt1>
) => StoreEnhancer<Ext0 & Ext1, StateExt0 & StateExt1> =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Initializes the Redux store with a lazyReducerEnhancer (so that you can
// lazily add reducers after the store has been created) and redux-thunk (so
// that you can dispatch async actions). See the "Redux and state management"
// section of the wiki for more details:
// https://github.com/Polymer/pwa-starter-kit/wiki/4.-Redux-and-state-management

const persistConfig = {
  key: "primary",
  debounce: 500,
  storage: localForage
} as PersistConfig;

const rootReducer = combineReducers({
  app: appReducer,
  event: persistReducer(persistConfig, eventReducer)
});
export const store = createStore(
  rootReducer,
  devCompose(
    lazyReducerEnhancer(combineReducers),
    applyMiddleware(thunk as ThunkMiddleware<RootState, RootAction>)
  )
);
