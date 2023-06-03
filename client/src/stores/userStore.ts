import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { API_URL } from '@/services/http'
import { userInfo, type IUser } from '@/services/userInfo'

export const useUserStore = defineStore('user', () => {
    const user = ref(userInfo.getUser()) as Ref<IUser | null>
    const savedAccessToken = userInfo.getAccess()
    const savedRefreshToken = userInfo.getRefresh()
    const refreshToken = ref(savedRefreshToken)
    const accessToken = ref(savedAccessToken)

    const register = (email: string, password: string, name: string) => {
        
        return axios.post(`${API_URL}/auth/register`, { email, password, name })
            .then((res) => {
                const { user, access, refresh } = res.data
                
                const accessToken = access.token
                const refreshToken = refresh.token
                userInfo.setTokens(accessToken, refreshToken)
                userInfo.setUser(user)
                user.value = user
                accessToken.value = accessToken
                refreshToken.value = refreshToken
                
                return true
            })
    }

    const login = (email: string, password: string) => {
        
        return axios.post(`${API_URL}/auth/login`, { email, password })
            .then((res) => {
                const { user, tokens: { access, refresh } } = res.data
                
                userInfo.setUser(user)
                userInfo.setTokens(access.token, refresh.token)
                user.value = user
                accessToken.value = access.token
                refreshToken.value = refresh.token
                
                return true
            })
    }

    const logout = () => {
        return axios.post(`${API_URL}/auth/logout`, { refreshToken: refreshToken.value })
            .then((res) => {
                userInfo.clearAll()
                return true
            })
        
    }

    return { user, refreshToken, accessToken, login, register, logout }
})