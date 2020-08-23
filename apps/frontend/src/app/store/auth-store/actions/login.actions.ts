import axiosInstance from '../../../utils/api';
import * as ActionTypes from '../types';
import { AxiosResponse, AxiosError } from 'axios';
import { UserDetails } from '@gurusishyan/request-interface';

const login = () => {
    return {
        type: ActionTypes.LOGIN
    }
}

const tokenLoginFailed = (obj) => {
    return {
        type: ActionTypes.TOKEN_LOGIN_FAILED,
        payload: obj
    }
}

const loginSuccess = (userObject: UserDetails) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        payload: userObject,
    };
};

const loginFailure = (error: string) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        payload: error,
    };
};


export const signInWithGoogle = () => {
    return {
        type: ActionTypes.SIGN_IN_WITH_GOOGLE
    }
}

export const signInWithGoogleSuccess = (google_user_details) => {
    return {
        type: ActionTypes.SIGN_IN_WITH_GOOGLE_SUCCESS,
        payload: google_user_details
    }
}

export const signInWithGoogleFailure = (err) => {
    return {
        type: ActionTypes.SIGN_IN_WITH_GOOGLE_FAILURE,
        payload: err
    }
}

export const whoami = () => {
    return (dispatch) => {
        dispatch(login())
        const token = localStorage.token;
        if (token) {
            axiosInstance
                .get('/user/me')
                .then((res: AxiosResponse) => {
                    dispatch(loginSuccess(res.data.data));
                })
                .catch((err: AxiosError) => {
                    if (err.response) {
                        if (err.response.data.code === 401) {
                            localStorage.removeItem('token');
                        }
                    }
                    dispatch(tokenLoginFailed(null));
                });
        } else {
            dispatch(tokenLoginFailed(null));
        }
    };
};

export const userLoginRequest = (credentials) => {
    return (dispatch) => {
        dispatch(login())
        axiosInstance
            .post('/auth/login', credentials)
            .then((res) => {
                if (res.data) {
                    dispatch(loginSuccess(res.data));
                    localStorage.setItem('token', res.data.token);
                }
            })
            .catch((err) => {
                if (err.response) {
                    dispatch(loginFailure(err.response.data));
                }
            });
    };
};

export const verifyGoogleToken = (token_id: string) => {
    return ((dispatch) => {
        axiosInstance.post('/auth/google/verify', token_id)
            .then((res) => {
                if (res.data) {
                    dispatch(signInWithGoogleSuccess(res.data))
                }
            }).catch((err) => {
                if (err.response) {
                    dispatch(signInWithGoogleFailure(err.response))
                }
            })
    })
}

