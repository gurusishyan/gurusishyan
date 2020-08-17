import { STUDENT_REGISTRATION_REQUEST, STUDENT_REGISTRATION_SUCCESS, STUDENT_REGISTRATION_FAILURE } from '../types'

export const initialState = {
    requesting: false
}

const studentRegistrationReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case STUDENT_REGISTRATION_REQUEST:
            return {
                ...state,
                requesting: true
            }
        case STUDENT_REGISTRATION_SUCCESS:
            return {
                ...state,
                requesting: false
            }
        case STUDENT_REGISTRATION_FAILURE:
            return {
                ...state,
                requesting: false
            }
        default:
            return state
    }
}

export default studentRegistrationReducer