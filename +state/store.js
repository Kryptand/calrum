import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { lazyReducerEnhancer } from "pwa-helpers/lazy-reducer-enhancer.js";
import app from "./reducers";
import { persistReducer, persistStore } from "redux-persist";
import localForage from "localforage";
localForage.config({
    name: "Calrum",
    storeName: "main"
});
// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Initializes the Redux store with a lazyReducerEnhancer (so that you can
// lazily add reducers after the store has been created) and redux-thunk (so
// that you can dispatch async actions). See the "Redux and state management"
// section of the wiki for more details:
// https://github.com/Polymer/pwa-starter-kit/wiki/4.-Redux-and-state-management
const persistConfig = {
    key: "primary",
    debounce: 500,
    storage: localForage
};
const persistedReducer = persistReducer(persistConfig, app);
export const store = createStore(state => state, persistedReducer, devCompose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk)));
export const persistor = persistStore(store);
const appReducer = app;
// Initially loaded reducers.
store.addReducers({
    app: appReducer
});
