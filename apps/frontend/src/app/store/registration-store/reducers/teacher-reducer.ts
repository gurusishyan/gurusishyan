import { TEACHER_REGISTRATION_REQUEST, TEACHER_REGISTRATION_SUCCESS, TEACHER_REGISTRATION_FAILURE } from '../types'

export const initialState = {
    requesting: false
}

const teacherRegistrationReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case TEACHER_REGISTRATION_REQUEST:
            return {
                ...state,
                requesting: true
            }
        case TEACHER_REGISTRATION_SUCCESS:
            return {
                ...state,
                requesting: false
            }
        case TEACHER_REGISTRATION_FAILURE:
            return {
                ...state,
                requesting: false
            }
        default:
            return state
    }
}

export default teacherRegistrationReducer