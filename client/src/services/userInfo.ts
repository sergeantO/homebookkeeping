export interface IUser {
    id: number
    name: string
    email: string
}

class UserInfo {
    private user = JSON.parse(localStorage.getItem('userInfo') || '{}') as IUser
    private access = localStorage.getItem('accessToken') || ''
    private refresh = localStorage.getItem('refreshToken') || ''

    setTokens(accessToken: string, refreshToken: string) {
        this.access = accessToken
        this.refresh = refreshToken

        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
    }

    setUser(user: IUser) {
        this.user = user
        localStorage.setItem('userInfo', JSON.stringify(user))
        return this.user
    }

    getUser() {
        return this.user
    }

    getAccess() {
        return this.access
    }

    getRefresh() {
        return this.refresh
    }

    clearTokens() {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }

    clearAll() {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('refreshToken')
    }
}

export const userInfo = new UserInfo()