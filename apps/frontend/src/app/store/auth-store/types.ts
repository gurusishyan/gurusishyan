import { UserDetails } from '@gurusishyan/request-interface'

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const TOKEN_LOGIN_FAILED = 'TOKEN_LOGIN_FAILED'

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE'

export interface UserState {
    isInitializing: boolean
    isLoggingIn: boolean,
    currentUser: UserDetails,
    error: string
}
