import axios, { type AxiosRequestConfig } from "axios";
import { notify } from "./Notify";
import router from "@/router";
import { userInfo } from "./userInfo";

export const API_URL = (import.meta.env.VITE_API_URL)

export const $http = axios.create({
    // withCredentials: true,
    baseURL: API_URL,
})

$http.interceptors.request.use(config => {
    const savedAccessToken = userInfo.getAccess()
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
                const savedRefreshToken = userInfo.getRefresh()
                
                const response = await axios.post(`${API_URL}/auth/refresh-tokens`, {
                    refreshToken: savedRefreshToken
                })

                const accessToken = response.data.access.token
                const refreshToken = response.data.refresh.token
                userInfo.setTokens(accessToken, refreshToken)
               
                return $http.request(originalRequest)
            }
        } catch (error: any) {
            if (error.response.status === 401) {
                userInfo.clearTokens()
                router.push('/login')
            } else {
                notify.error('Что-то пошло не так')
            }
           
        }
       
    }
)