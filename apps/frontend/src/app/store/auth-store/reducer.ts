import { UserState, LOGIN_SUCCESS, LOGIN, LOGIN_FAILURE, TOKEN_LOGIN_FAILED } from './types';

const initialState: UserState = {
    currentUser: null,
    isInitializing: true,
    isLoggingIn: false,
    error: '',
};

const authReducer = (
    state = initialState,
    action
): UserState => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isInitializing: false,
                isLoggingIn: true
            }
        case TOKEN_LOGIN_FAILED:
            return {
                ...state,
                isInitializing: false,
                currentUser: null,
                isLoggingIn: false,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isInitializing: false,
                isLoggingIn: false,
            };
        case LOGIN_FAILURE:
            return { ...state, error: action.payload, isLoggingIn: false };
        default:
            return state;
    }
};

export default authReducer;
