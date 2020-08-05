import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api'
})

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
    if (error.response.status = 504) {
        console.log("Request timed out")
    } else {
        console.log(error.response.data.message)
    }
    return Promise.reject({ ...error })
}


axiosInstance.interceptors.request.use((request) => apiRequestHandler(request))
axiosInstance.interceptors.response.use(
    (response) => apiResponseHandler(response),
    (error) => apiErrorHandler(error)
)

export default axiosInstance