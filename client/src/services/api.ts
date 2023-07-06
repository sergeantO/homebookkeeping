import { AccountTypeEnum } from '@/models'
import { $http } from '@/services/http'

export class Api {
    static createOperation(name: string, value: number, creditAccount: number, debitAccount: number) {
        return $http.post('/data/operations', { name, value, creditAccount, debitAccount })
    }

    static createAccount(name: string, type: AccountTypeEnum, isClosable: boolean) {
        return $http.post('/data/accounts', { name, type: AccountTypeEnum[type], isClosable })
    }

    static deletetOperation(id: number) {
        return $http.delete(`/data/operations/${id}`)
    }

    static getOperations(from: number, to: number) {
        return $http.get(`/data/operations?from=${from}&to=${to}`)
    }

    static getAccounts() {
        return $http.get('/data/accounts')
    }

    static getBalance(from: number) {
        return $http.get(`/data/balances?from=${from}`)
    }

    static closePeriod(targetAccount?: number) {
        if (!targetAccount) {
            return
        }
        return $http.post('/data/balances', { targetAccount })
    }
}