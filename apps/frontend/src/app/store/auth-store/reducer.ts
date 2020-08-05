import { UserState, LOGIN_USER } from './types';

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
        case LOGIN_USER:
            return {
                ...state,
                currentUser: action.payload,
                isInitializing: false,
                isLoggingIn: false,
            };
        default:
            return state;
    }
};

export default authReducer;
