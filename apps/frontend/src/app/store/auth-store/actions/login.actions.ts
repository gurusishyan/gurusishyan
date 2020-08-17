import axiosInstance from '../../../utils/api';
import { LOGIN_FAILURE, LOGIN, LOGIN_SUCCESS, TOKEN_LOGIN_FAILED } from '../types';
import { AxiosResponse, AxiosError } from 'axios';
import { UserDetails } from '@gurusishyan/request-interface';

const login = () => {
    return {
        type: LOGIN
    }
}

const tokenLoginFailed = (obj) => {
    return {
        type: TOKEN_LOGIN_FAILED,
        payload: obj
    }
}

const loginSuccess = (userObject: UserDetails) => {
    return {
        type: LOGIN_SUCCESS,
        payload: userObject,
    };
};

const loginFailure = (error: string) => {
    return {
        type: LOGIN_FAILURE,
        payload: error,
    };
};

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
