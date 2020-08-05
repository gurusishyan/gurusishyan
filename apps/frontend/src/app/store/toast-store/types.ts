export const SHOW_TOAST = 'SHOW_TOAST'
export const CLOSE_TOAST = 'CLOSE_TOAST'

export interface ToastState {
    toastVisibility: boolean
    toastMessage: string
    isError: boolean
}