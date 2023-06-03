import { AccountTypeEnum } from '@/models'
import { $http } from '@/services/http'

export class Api {
    static createOperation(name: string, value: number, creditAccount: number, debitAccount: number) {
        return $http.post('/data/operations', { name, value, creditAccount, debitAccount })
    }

    static createAccount(name: string, type: AccountTypeEnum) {
        return $http.post('/data/accounts', { name, type: AccountTypeEnum[type] })
    }

    static deletetOperation(id: number) {
        return $http.delete(`/data/operations/${id}`)
    }

    static getOperations() {
        return $http.get('/data/operations')
    }

    static getAccounts() {
        return $http.get('/data/accounts')
    }
}