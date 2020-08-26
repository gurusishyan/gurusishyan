import { UserDetails } from '@gurusishyan/request-interface'

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'


export const SIGN_IN_WITH_GOOGLE = 'SIGN_IN_WITH_GOOGLE'
export const SIGN_IN_WITH_GOOGLE_SUCCESS = 'SIGN_IN_WITH_GOOGLE_SUCCESS'
export const SIGN_IN_WITH_GOOGLE_FAILURE = 'SIGN_IN_WITH_GOOGLE_FAILURE'


export const TOKEN_LOGIN_FAILED = 'TOKEN_LOGIN_FAILED'

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE'

export const SHOW_MODAL = 'SHOW_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

export const LOGOUT_USER = 'LOGOUT_USER'

export interface UserState {
    isInitializing: boolean
    isLoggingIn: boolean,
    currentUser: UserDetails,
    error: string
}
