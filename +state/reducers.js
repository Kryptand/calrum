import { UPDATE_PAGE, UPDATE_OFFLINE } from "./actions";
const INITIAL_STATE = {
    page: "",
    offline: false,
    drawerOpened: false,
    snackbarOpened: false
};
const app = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_PAGE:
            return Object.assign({}, state, { page: action.page });
        case UPDATE_OFFLINE:
            return Object.assign({}, state, { offline: action.offline });
        default:
            return state;
    }
};
export default app;
