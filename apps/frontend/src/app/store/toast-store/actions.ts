import { SHOW_TOAST, CLOSE_TOAST } from './types'

export const showToast = (message: string, isError: boolean) => {
    return {
        type: SHOW_TOAST,
        payload: {
            message,
            isError
        }
    }
}

export const closeToast = () => {
    return {
        type: CLOSE_TOAST
    }
}