import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from '../types'
import axiosInstance from '../../../utils/api'
import { AxiosResponse, AxiosError } from 'axios'

const passwordResetRequest = (email_details) => {
    return {
        type: RESET_PASSWORD_REQUEST,
        payload: email_details
    }
}

const passwordResetSuccess = (email_details) => {
    return {
        type: RESET_PASSWORD_SUCCESS,
        payload: email_details
    }
}

const passwordResetFailure = (err) => {
    return {
        type: RESET_PASSWORD_FAILURE,
        payload: err
    }
}

export const requestingPasswordReset = (email_details) => {
    return ((dispatch) => {
        dispatch(passwordResetRequest(email_details))
        axiosInstance.post('password/reset', email_details)
            .then((res: AxiosResponse) => {
                if (res.data) {
                    dispatch(passwordResetSuccess(res.data))
                }
            })
            .catch((err: AxiosError) => {
                if (err.response) {
                    dispatch(passwordResetFailure(err.response))
                }
            })
    })
}