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

    const clear = () => {
        operationList.value = []
    }

    function addOperation(name: string, val: number, creditAccount: Account, debitAccount: Account){
        return Api.createOperation(name, val, creditAccount.id, debitAccount.id)
            .then((res) => {
                const { id, name, value, createdAt } = res.data
                const op = new Operation( id, name, value, creditAccount, debitAccount, new Date(createdAt) )
                operationList.value.push(op)
                return op
            })
    }

    const remove = async (id: number) => {
        return Api.deletetOperation(id)
            .then((res) => {
                operationList.value = operationList.value.filter(op => op.id !== id)
            })
    }

    const getOperations = async () => {
        const { from, to } = periodStore.toDate
        const res = await Api.getOperations(from.getTime(), to.getTime())
        res.data.forEach((op: any) => {
            const { id, name, creditAccountId, debitAccountId, value, createdAt } = op
            const findedOp = operationList.value.find((o) => o.id === id)
            if (!findedOp) {
                const creditAccount = accountStore.getAccount(creditAccountId) as Account
                const debitAccount = accountStore.getAccount(debitAccountId) as Account
                const operation = new Operation( id, name, value, creditAccount, debitAccount, new Date(createdAt) )
                operationList.value.push(operation)
            }
        })
    }

    const operationsBeforePeriod = computed(() => {
        const { from } = periodStore.toDate

        const monthFirstDay = new Date(from.getFullYear(), from.getMonth(), 1, 0, 0, 0)

        return operationList.value
            .filter(i => i.createdAt < from)
            .filter(i => i.createdAt >= monthFirstDay)
            .sort((a,b) => (b.createdAt.getTime() - a.createdAt.getTime())) // desc sort
    })

    const operationsInPeriod = computed(() => {
        const { from, to } = periodStore.toDate

        return operationList.value
            .filter(i => i.createdAt >= from)
            .filter(i => i.createdAt < to)
            .sort((a,b) => (b.createdAt.getTime() - a.createdAt.getTime())) // desc sort
    })

    function getOperation(id: number) {
        return operationList.value.find(i => i.id === id)
    }

    return { operationsInPeriod, addOperation, getOperation, getOperations, operationsBeforePeriod, remove, clear }
})

