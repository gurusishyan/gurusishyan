import { START_LOADER, STOP_LOADER, START_FULL_SCREEN_LOADER, STOP_FULL_SCREEN_LOADER } from "./types"

const initialState = {
    isLoading: false,
    isFullScreenLoading: false
}

const loaderReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case START_LOADER:
            return {
                ...state,
                isLoading: true
            }
        case STOP_LOADER:
            return {
                ...state,
                isLoading: false
            }
        case START_FULL_SCREEN_LOADER:
            return {
                ...state,
                isFullScreenLoading: true
            }
        case STOP_FULL_SCREEN_LOADER:
            return {
                ...state,
                isFullScreenLoading: false
            }
        default:
            return state
    }
}

export default loaderReducer