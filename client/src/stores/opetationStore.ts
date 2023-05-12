import { Operation, type Account } from "@/models"
import { Api } from "@/services/api"
import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { usePeriodStore } from "./periodStore"
import { useAccountStore } from "./accountStore"

export const useOpetationStore = defineStore('operation', () => {
    const operationList = ref([] as Operation[])
    
    const accountStore = useAccountStore()
    const periodStore = usePeriodStore()

    function addOperation(name: string, val: number, creditAccount: Account, debitAccount: Account){
        return Api.createOperation(name, val, creditAccount.id, debitAccount.id)
            .then((res) => {
                const { id, name, creditAccountId, debitAccountId, value, createdAt } = res.data
                const op = new Operation( id, name, value, creditAccount, debitAccount, new Date(createdAt) )
                operationList.value.push(op)
                return op
            })
    }

    const getOperations = async () => {
        const res = await Api.getOperations()
        res.data.forEach((op: any) => {
            const { id, name, creditAccountId, debitAccountId, value, createdAt } = op
            const creditAccount = accountStore.getAccount(creditAccountId) as Account
            const debitAccount = accountStore.getAccount(debitAccountId) as Account
            const operation = new Operation( id, name, value, creditAccount, debitAccount, new Date(createdAt) )
            console.log(operation)
            operationList.value.push(operation)
            return op
        })
    }

    const operationsInPeriod = computed(() => {
        const [ startDate, endDate ] = periodStore.toDateRange

        return operationList.value
            .filter(i => i.createdAt >= startDate)
            .filter(i => i.createdAt < endDate)
    })

    function getOperation(id: number) {
        return operationList.value.find(i => i.id === id)
    }

    return { operationsInPeriod, addOperation, getOperation, getOperations }
})

