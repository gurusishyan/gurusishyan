import axiosInstance from '../../utils/api';
import { UserDetails, LOGIN_USER, LOGIN_FAILURE } from './types';
import { AxiosResponse, AxiosError } from 'axios';

const loginUser = (userObject: UserDetails) => {
    return {
        type: LOGIN_USER,
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
                    dispatch(loginUser(res.data.data));
                })
                .catch((err: AxiosError) => {
                    if (err.response) {
                        if (err.response.data.code === 401) {
                            localStorage.removeItem('token');
                        }
                    }
                    dispatch(loginUser(null));
                });
        } else {
            dispatch(loginUser(null));
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
                    dispatch(loginUser(res.data.data));
                }
            })
            .catch((err) => {
                if (err.response) {
                    dispatch(userLoginFailure(err.response.data.message));
                }
            });
    };
};
