import { ToastState, SHOW_TOAST, CLOSE_TOAST } from './types';

export const initialState: ToastState = {
    toastVisibility: false,
    toastMessage: '',
    isError: false
}

const toastReducer = (
    state = initialState,
    action
): ToastState => {
    switch (action.type) {
        case SHOW_TOAST:
            return {
                ...state,
                toastVisibility: true,
                toastMessage: action.payload.message,
                isError: action.payload.isError
            }
        case CLOSE_TOAST:
            return initialState
        default:
            return state
    }
}

export default toastReducer