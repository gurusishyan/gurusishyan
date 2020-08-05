export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export interface UserState {
    isInitializing: boolean
    isLoggingIn: boolean,
    currentUser: UserDetails,
    error: string
}

export interface UserDetails {
    username: string;
    userId: string;
    email: string;
    role: string;
    createdAt: Date;
}