import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { API_URL } from '@/services/http'
import { tokens } from '@/services/tokens'
import router from '@/router'

class User {
    constructor(
        public email: string,
        public id: number,
        public isEmailVerified: boolean,
        public name: string,
        public role: string,
    ) {}
}

export const useUserStore = defineStore('user', () => {
    const user = ref(null) as Ref<User | null>
    const savedAccessToken = tokens.getAccess()
    const savedRefreshToken = tokens.getRefresh()
    const refreshToken = ref(savedRefreshToken)
    const accessToken = ref(savedAccessToken)

    const register = (email: string, password: string) => {
        
        return axios.post(`${API_URL}/auth/register`, { email, password })
            .then((res) => {
                const { email, id, isEmailVerified, name, role  } = res.data.user
                user.value = new User( email, id, isEmailVerified, name, role)
                
                const accessToken = res.data.access.token
                const refreshToken = res.data.refresh.token
                tokens.set(accessToken, refreshToken)
                accessToken.value = accessToken
                refreshToken.value = refreshToken
                
                return true
            })
    }

    const login = (email: string, password: string) => {
        
        return axios.post(`${API_URL}/auth/login`, { email, password })
            .then((res) => {
                const { user, tokens: { access, refresh } } = res.data
                tokens.set(access.token, refresh.token)
                accessToken.value = access.token
                refreshToken.value = refresh.token

                const { email, id, isEmailVerified, name, role  } = user
                user.value = new User( email, id, isEmailVerified, name, role)
                
                return true

            })
    }

    const logout = () => {
        return axios.post(`${API_URL}/auth/logout`, {
            refreshToken: refreshToken.value
        })
            .then((res) => {
                tokens.clear()
                router.push('/login')
            })
        
    }

    return { user, refreshToken, accessToken, login, register, logout }
})