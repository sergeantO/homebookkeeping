import axios, { type AxiosRequestConfig } from "axios";

export const API_URL = "http://127.0.0.1:3000/v1"

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
                
                const response = await axios.post(`${API_URL}/auth/refresh`, null, {
                    headers: {
                        'Refresh-token': savedRefreshToken
                    }
                })
                localStorage.setItem('accessToken', response.data.tokens.access.token)
                localStorage.setItem('refreshToken', response.data.tokens.refresh.token)
               
                return $http.request(originalRequest)
            }
        } catch (e: any) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            console.log('НЕ АВТОРИВОВАН!!!')
        }
       
    }
)