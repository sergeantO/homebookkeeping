import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { API_URL } from '@/services/http'

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
    const savedAccessToken = localStorage.getItem('accessToken') || ''
    const savedRefreshToken = localStorage.getItem('refreshToken') || ''
    const refreshToken = ref(savedRefreshToken)
    const accessToken = ref(savedAccessToken)

    const register = (email: string, password: string) => {
        
        return axios.post(`${API_URL}/v1/auth/register`, {
            email,
            password
        }).then((res) => {
            const { email, id, isEmailVerified, name, role  } = res.data.user
            user.value = new User( email, id, isEmailVerified, name, role)
            accessToken.value = res.data.tokens.access.token
            refreshToken.value = res.data.tokens.refresh.token
            localStorage.setItem('accessToken', res.data.tokens.access.token)
            localStorage.setItem('refreshToken', res.data.tokens.refresh.token)
            return true
        })
    }

    const login = (email: string, password: string) => {
        
        return axios.post(`${API_URL}/auth/login`, {
                email,
                password
            }).then((res) => {
                const { email, id, isEmailVerified, name, role  } = res.data.user
                user.value = new User( email, id, isEmailVerified, name, role)
                accessToken.value = res.data.tokens.access.token
                refreshToken.value = res.data.tokens.refresh.token
                localStorage.setItem('accessToken', res.data.tokens.access.token)
                localStorage.setItem('refreshToken', res.data.tokens.refresh.token)
                return true
            })
    }

    return { user, refreshToken, accessToken, login, register }
})