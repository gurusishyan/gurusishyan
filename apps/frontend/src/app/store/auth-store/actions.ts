import axiosInstance from '../../utils/api';
import { UserDetails, LOGIN_SUCCESS, LOGIN_FAILURE } from './types';
import { AxiosResponse, AxiosError } from 'axios';

const userLoginSuccess = (userObject: UserDetails) => {
    return {
        type: LOGIN_SUCCESS,
        payload: userObject,
    };
};

const userLoginFailure = (error: string) => {
    return {
        type: LOGIN_FAILURE,
        payload: error,
    };
};

export const whoami = () => {
    return (dispatch) => {
        const token = localStorage.token;
        if (token) {
            axiosInstance
                .get('/user/me')
                .then((res: AxiosResponse) => {
                    dispatch(userLoginSuccess(res.data.data));
                })
                .catch((err: AxiosError) => {
                    if (err.response) {
                        if (err.response.data.code === 401) {
                            localStorage.removeItem('token');
                        }
                    }
                    dispatch(userLoginSuccess(null));
                });
        } else {
            dispatch(userLoginSuccess(null));
        }
    };
};

export const userLoginRequest = (credentials) => {
    return (dispatch) => {
        axiosInstance
            .post('/auth/login', credentials)
            .then((res) => {
                if (res.data) {
                    localStorage.setItem('token', res.data.data.token);
                    dispatch(userLoginSuccess(res.data.data));
                }
            })
            .catch((err) => {
                if (err.response) {
                    dispatch(userLoginFailure(err.response.data.message));
                }
            });
    };
};
