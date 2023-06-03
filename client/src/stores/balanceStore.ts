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
        const operationsBeforePeriod = opetationStore.operationsBeforePeriod

        const result = [] as IBalanceResult[] 

        for (const account of activeAccounts) {
            const operationsByAccountAndPeriod = account.operationsByAccount(operations)
            const operationsByAccountAndBeforePeriod = account.operationsByAccount(operationsBeforePeriod)

            let startVal = operationsByAccountAndBeforePeriod.reduce((acc, op) => {
                if (op.creditAccount.id === account.id) {
                    acc -= op.val
                } else if (op.debitAccount.id === account.id) {
                    acc += op.val
                }   
                return acc
            }, 0)

            if (!account.isAssetAccount) {
                startVal *= -1
            }
                
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

    return {
        process,
    }
})





