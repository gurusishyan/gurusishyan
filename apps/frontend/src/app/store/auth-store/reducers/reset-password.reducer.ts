import * as ActionTypes from "../types"

const initialState = {
    modal: false,
    requesting: false,
    user_details: null,
    error: null
}

const resetPasswordReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionTypes.SHOW_MODAL:
            return {
                ...state,
                modal: true
            }
        case ActionTypes.CLOSE_MODAL:
            return {
                ...state,
                modal: false
            }
        case ActionTypes.RESET_PASSWORD_REQUEST:
            return {
                ...state,
                requesting: true
            }
        case ActionTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                requesting: false,
                error: null,
                user_details: action.payload,
                modal: false
            }
        case ActionTypes.RESET_PASSWORD_FAILURE:
            return {
                ...state,
                requesting: false,
                user_details: null,
                error: action.payload,
                modal: false
            }
        default:
            return state
    }
}

export default resetPasswordReducer