import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from "../types"

const initialState = {
    requesting: false
}

const resetPasswordReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                requesting: true
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                requesting: false
            }
        case RESET_PASSWORD_FAILURE:
            return {
                ...state,
                requesting: false
            }
        default:
            return state
    }
}

export default resetPasswordReducer