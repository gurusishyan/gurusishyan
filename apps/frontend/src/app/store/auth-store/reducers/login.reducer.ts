import * as ActionTypes from '../types';

const initialState: ActionTypes.UserState = {
    currentUser: null,
    isInitializing: true,
    isLoggingIn: false,
    error: '',
};

const authReducer = (
    state = initialState,
    action
): ActionTypes.UserState => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return {
                ...state,
                isInitializing: false,
                isLoggingIn: true
            }
        case ActionTypes.TOKEN_LOGIN_FAILED:
            return {
                ...state,
                isInitializing: false,
                currentUser: null,
                isLoggingIn: false,
            }
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isInitializing: false,
                isLoggingIn: false,
            };
        case ActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoggingIn: false
            };

        case ActionTypes.SIGN_IN_WITH_GOOGLE_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
            }
        case ActionTypes.SIGN_IN_WITH_GOOGLE_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
};

export default authReducer;
