import { AxiosError, AxiosResponse } from 'axios'

import { TeacherDetails } from '@gurusishyan/request-interface'
import { TEACHER_REGISTRATION_REQUEST, TEACHER_REGISTRATION_SUCCESS, TEACHER_REGISTRATION_FAILURE } from '../types'
import axiosInstance from '../../../utils/api'
import { stopLoader, startLoader } from '../../loader-store/loader.actions'

const teacherRegistrationRequest = (teacher_details: TeacherDetails) => {
    return {
        type: TEACHER_REGISTRATION_REQUEST,
        payload: teacher_details
    }
}

const teacherRegistrationSuccess = (teacher_details: TeacherDetails) => {
    return {
        type: TEACHER_REGISTRATION_SUCCESS,
        payload: teacher_details
    }
}

const teacherRegistrationFailure = (err: AxiosError) => {
    return {
        type: TEACHER_REGISTRATION_FAILURE,
        payload: err
    }
}


export const requestingTeacherRegistration = (teacher_details: TeacherDetails) => {
    return ((dispatch) => {
        dispatch(teacherRegistrationRequest(teacher_details))
        dispatch(startLoader())
        axiosInstance.post('auth/register/teacher', teacher_details)
            .then((res: AxiosResponse) => {
                if (res.data) {
                    dispatch(teacherRegistrationSuccess(res.data))
                    dispatch(stopLoader())
                }
            }).catch((err) => {
                if (err.response) {
                    dispatch(teacherRegistrationFailure(err.response))
                    dispatch(stopLoader())
                }
            })
    })
}