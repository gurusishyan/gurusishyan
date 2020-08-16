import { STUDENT_REGISTRATION_REQUEST, STUDENT_REGISTRATION_SUCCESS, STUDENT_REGISTRATION_FAILURE } from './types'
import axiosInstance from '../../utils/api'
import { AxiosResponse, AxiosError } from 'axios';
export const studentRegistrationRequest = () => {
    return {
        type: STUDENT_REGISTRATION_REQUEST
    }
}

export const studentRegistrationSuccess = (student_details) => {
    return {
        type: STUDENT_REGISTRATION_SUCCESS,
        payload: student_details
    }
}

export const studentRegistrationFailure = (error) => {
    return {
        type: STUDENT_REGISTRATION_FAILURE,
        payload: error
    }
}


export const requestingStudentRegistration = (student_details) => {
    return ((dispatch) => {
        dispatch(studentRegistrationRequest())
        axiosInstance.post('student/registration', student_details)
            .then((res: AxiosResponse) => {
                if (res.data) {
                    dispatch(studentRegistrationSuccess(res.data))
                }
            })
            .catch((err: AxiosError) => {
                if (err.response) {
                    dispatch(studentRegistrationFailure(err.response.data))
                }
            })
    })
}