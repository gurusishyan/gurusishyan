import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE, SHOW_MODAL, CLOSE_MODAL } from '../types'
import axiosInstance from '../../../utils/api'
import { AxiosResponse, AxiosError } from 'axios'
import { successToast } from '../../../utils/toast'

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

export const showModal = () => {
    return {
        type: SHOW_MODAL
    }
}

export const closeModal = () => {
    return {
        type: CLOSE_MODAL
    }
}

export const requestingPasswordReset = (email_details) => {
    return ((dispatch) => {
        dispatch(passwordResetRequest(email_details))
        axiosInstance.post(`auth/request-reset-password?email=${email_details}`)
            .then((res: AxiosResponse) => {
                if (res.data) {
                    successToast("Please check your mail to reset password")
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