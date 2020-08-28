import { STUDENT_REGISTRATION_REQUEST, STUDENT_REGISTRATION_SUCCESS, STUDENT_REGISTRATION_FAILURE } from '../types'
import axiosInstance from '../../../utils/api'
import { AxiosResponse, AxiosError } from 'axios';
import { StudentDetails } from '@gurusishyan/request-interface'
import { startLoader, stopLoader } from '../../loader-store/loader.actions';

export const studentRegistrationRequest = (student_details: StudentDetails) => {
    return {
        type: STUDENT_REGISTRATION_REQUEST,
        payload: student_details
    }
}

export const studentRegistrationSuccess = (student_details: StudentDetails) => {
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


export const requestingStudentRegistration = (student_details: StudentDetails) => {
    return ((dispatch) => {
        dispatch(studentRegistrationRequest(student_details))
        dispatch(startLoader())
        axiosInstance.post('auth/register/student', student_details)
            .then((res: AxiosResponse) => {
                if (res.data) {
                    dispatch(studentRegistrationSuccess(res.data))
                    dispatch(stopLoader())
                }
            })
            .catch((err: AxiosError) => {
                if (err.response) {
                    dispatch(studentRegistrationFailure(err.response.data))
                    dispatch(stopLoader())
                }
            })
    })
}