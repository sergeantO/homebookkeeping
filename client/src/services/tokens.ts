class Tokens {
    private access = localStorage.getItem('accessToken') || ''
    private refresh = localStorage.getItem('refreshToken') || ''

    set(accessToken: string, refreshToken: string) {
        this.access = accessToken
        this.refresh = refreshToken

        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
    }

    getAccess() {
        return this.access
    }

    getRefresh() {
        return this.refresh
    }

    clear() {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }
}

export const tokens = new Tokens()