import * as ActionTypes from '../types'
import axiosInstance from '../../../utils/api'
import { AxiosResponse, AxiosError } from 'axios'
import { successToast } from '../../../utils/toast'

const forgotPasswordRequest = (email_details) => {
    return {
        type: ActionTypes.FORGOT_PASSWORD_REQUEST,
        payload: email_details
    }
}

const forgotPasswordRequestSuccess = (email_details) => {
    return {
        type: ActionTypes.FORGOT_PASSWORD_REQUEST_SUCCESS,
        payload: email_details
    }
}

const forgotPasswordRequestFailure = (err) => {
    return {
        type: ActionTypes.FORGOT_PASSWORD_REQUEST_FAILURE,
        payload: err
    }
}

const resetPassword = (password_details) => {
    return {
        type: ActionTypes.RESET_PASSWORD,
        payload: password_details
    }
}

const resetPasswordSuccess = (updated_password_details) => {
    return {
        type: ActionTypes.RESET_PASSWORD_SUCCESS,
        payload: updated_password_details
    }
}

const resetPasswordFailure = (err) => {
    return {
        type: ActionTypes.RESET_PASSWORD_FAILURE,
        payload: err
    }
}

export const showModal = () => {
    return {
        type: ActionTypes.SHOW_MODAL
    }
}

export const closeModal = () => {
    return {
        type: ActionTypes.CLOSE_MODAL
    }
}



export const forgotPassword = (email_details) => {
    return ((dispatch) => {
        dispatch(forgotPasswordRequest(email_details))
        axiosInstance.post(`auth/request-reset-password?email=${email_details}`)
            .then((res: AxiosResponse) => {
                if (res.data) {
                    successToast("Please check your mail to reset password")
                    dispatch(forgotPasswordRequestSuccess(res.data))

                }
            })
            .catch((err: AxiosError) => {
                if (err.response) {
                    dispatch(forgotPasswordRequestFailure(err.response))
                }
            })
    })
}

export const resetPasswordRequest = (password_details, history) => {
    return ((dispatch) => {
        dispatch(resetPassword(password_details))
        axiosInstance.post(`auth/reset-password`, password_details)
            .then((res) => {
                if (res.data) {
                    dispatch(resetPasswordSuccess(res.data))
                    successToast("Password changed successfully, please login to continue")
                    history.push('/')
                }
            })
            .catch((err) => {
                if (err.response) {
                    dispatch(resetPasswordFailure(err.response))
                    history.push('/')
                }
            })
    })
}