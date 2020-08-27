import * as ActionTypes from "../types"

const initialState = {
    modal: false,
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
        case ActionTypes.FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
            }
        case ActionTypes.FORGOT_PASSWORD_REQUEST_SUCCESS:
            return {
                ...state,
                error: null,
                user_details: action.payload,
                modal: false
            }
        case ActionTypes.FORGOT_PASSWORD_REQUEST_FAILURE:
            return {
                ...state,
                user_details: null,
                error: action.payload,
                modal: false
            }
        default:
            return state
    }
}

export default resetPasswordReducer