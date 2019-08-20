export const UPDATE_PAGE = "UPDATE_PAGE";
export const UPDATE_OFFLINE = "UPDATE_OFFLINE";
export const updateOffline = (offline) => (dispatch, getState) => {
    if (offline !== getState().app.offline) {
        console.debug('offline');
    }
    dispatch({
        type: UPDATE_OFFLINE,
        offline
    });
};
