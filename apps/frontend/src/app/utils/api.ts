import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { showToast } from '../store/toast-store/actions';
import store from '../store/configureStore';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api'
})

const { dispatch } = store

const apiRequestHandler = (request: AxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
        request.headers({ Authorization: `Bearer ${token}` })
    }
    return request
}

const apiResponseHandler = (response: AxiosResponse) => {
    return response
}

const apiErrorHandler = (error: AxiosError) => {
    if (error.response.status === 504) {
        dispatch(showToast('Request timed out', true))
    } else {
        dispatch(showToast(error.response.data.payload, true))
    }
    return Promise.reject({ ...error })
}


axiosInstance.interceptors.request.use((request) => apiRequestHandler(request))
axiosInstance.interceptors.response.use(
    (response) => apiResponseHandler(response),
    (error) => apiErrorHandler(error)
)

export default axiosInstance