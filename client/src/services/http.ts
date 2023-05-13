import axios, { type AxiosRequestConfig } from "axios";
import { notify } from "./Notify";

export const API_URL = (import.meta.env.VITE_API_URL)

export const $http = axios.create({
    // withCredentials: true,
    baseURL: API_URL,
})

$http.interceptors.request.use(config => {
    const savedAccessToken = localStorage.getItem('accessToken')
    config.headers.Authorization = `Bearer ${savedAccessToken}`
    return config
})

$http.interceptors.response.use(
    (response) => (response),
    async (error) => {
        try {
            const originalRequest: AxiosRequestConfig & {_isRetry: boolean} = error.config

            if (error.response.status === 401 && !originalRequest._isRetry) {
                originalRequest._isRetry = true
                const savedRefreshToken = localStorage.getItem('refreshToken')
                
                const response = await axios.post(`${API_URL}/auth/refresh-tokens`, {
                    refreshToken: savedRefreshToken
                })
                
                localStorage.setItem('accessToken', response.data.access.token)
                localStorage.setItem('refreshToken', response.data.refresh.token)
               
                return $http.request(originalRequest)
            }
        } catch (error: any) {
            if (error.response.status === 401) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                console.log('НЕ АВТОРИВОВАН!!!')
            } else {
                notify.error('Что-то пошло не так')
            }
           
        }
       
    }
)