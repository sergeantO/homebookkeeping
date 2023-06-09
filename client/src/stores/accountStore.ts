import { Account, type AccountTypeEnum } from "@/models"
import { AccountType } from "@/models/Account"
import { Api } from "@/services/api"
import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { useOpetationStore } from "./opetationStore"

export const useAccountStore = defineStore('account', () => {
    const accountList = ref([] as Account[])
    const opetationStore = useOpetationStore()

    const clear = () => {
        accountList.value = []
    }

    const addAccount = async(accountType: AccountTypeEnum, name: string, isClosable: boolean) => {
        const res = await Api.createAccount(name, accountType, isClosable)
        const { id, type } = res.data 
        const st = String(type) as keyof typeof AccountType
        const ac = new Account(id, AccountType[st], name, isClosable)
        accountList.value.push(ac)
        return ac
    }

    const getAccounts = async () => {
        const res = await Api.getAccounts()
        res.data.forEach((ac: any) => {
            const { id, type, name, isClosable } = ac 
            const findedAcc = accountList.value.find((acc) => acc.id === id)
            if (!findedAcc) {
                const st = String(type) as keyof typeof AccountType
                const account = new Account(id, AccountType[st], name, isClosable)
                accountList.value.push(account)
            }
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
        isActiveOnly, activeAccounts, addAccount, getAccount, getAccounts, clear
    }
})
