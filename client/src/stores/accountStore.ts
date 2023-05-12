import { Account, type AccountTypeEnum } from "@/models"
import { AccountType } from "@/models/Account"
import { Api } from "@/services/api"
import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { useOpetationStore } from "./opetationStore"

export const useAccountStore = defineStore('account', () => {
    const accountList = ref([] as Account[])
    const opetationStore = useOpetationStore()

    const addAccount = async(accountType: AccountTypeEnum, name: string) => {
        const res = await Api.createAccount(name, accountType)
        const { id, type } = res.data 
        const st = String(type) as keyof typeof AccountType
        const ac = new Account(id, AccountType[st], name)
        accountList.value.push(ac)
        return ac
    }

    const getAccounts = async () => {
        const res = await Api.getAccounts()
        res.data.forEach((ac: any) => {
            const { id, type, name } = ac 
            const st = String(type) as keyof typeof AccountType
            const account = new Account(id, AccountType[st], name)
            accountList.value.push(account)
        })
    }

    const getAccount = (id: number) => {
        return accountList.value.find(i => i.id === id)
    }

    const isActiveOnly = ref(false)
    
    const activeAccounts = computed(() => {
        const accounts = accountList.value
        
        if (isActiveOnly.value) {
            const operationList = opetationStore.operationsInPeriod
            return accounts.filter((account) => {
                return operationList.some(op => {
                    return op.creditAccount.id === account.id
                        || op.debitAccount.id === account.id
                })
            })
        }
    
        return accounts
    })


    return { 
        isActiveOnly, activeAccounts, addAccount, getAccount, getAccounts
    }
})
