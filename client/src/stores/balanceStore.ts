import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Api } from '@/services/api'
import type { Account } from '@/models/Account'
import { usePeriodStore } from './periodStore'
import { useOpetationStore } from './opetationStore'
import { useAccountStore } from './accountStore'

export interface IBalanceResult {
    account: Account
    startVal: number
    credit: number
    debit: number
    result: number
    endVal: number
}

export const useBalanceStore = defineStore('balance', () => {
    
    const accountStore = useAccountStore()
    const opetationStore = useOpetationStore()

    const process = computed(() => {
        const activeAccounts = accountStore.activeAccounts
        const operations = opetationStore.operationsInPeriod

        const result = [] as IBalanceResult[] 

        for (const account of activeAccounts) {
            const operationsByAccountAndPeriod = account.operationsByAccount(operations)
            const startVal = 0
                
            const curr = {
                account: account,
                startVal: startVal,
                credit: account.credit(operationsByAccountAndPeriod),
                debit: account.debit(operationsByAccountAndPeriod),
                result: account.result(operationsByAccountAndPeriod),
                endVal: account.result(operationsByAccountAndPeriod) + startVal
            }

            result.push(curr)
        }

        return result
    })

    function toLose(creditAccount: Account, sum: number, date = new Date()) {
        // const profitAccount = accountStore.profit
        // opetationStore.addOperation('Списание', sum, creditAccount, profitAccount, date)
    }

    return {
        toLose, process,
    }
})





