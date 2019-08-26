const INITIAL_STATE = {
    ids: [],
    events: []
};
const eventReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "[Event] Add" /* AddEvent */:
            return Object.assign({}, state, { events: [...state.events, action.event], ids: [...state.ids, action.event.id] });
        case "[Event] Update" /* UpdateEvent */:
            return Object.assign({}, state, { events: [...state.events, Object.assign({}, state.events.find(x => x.id === action.event.id), action.event)] });
        case "[Event] Delete" /* DeleteEvent */:
            return Object.assign({}, state, { events: state.events.filter(x => x.id !== action.id), ids: state.ids.filter(x => x !== action.id) });
        default:
            return state;
    }
};
export const reducer = (eventReducer);
