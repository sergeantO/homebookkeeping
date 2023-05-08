import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Account, AccountTypeEnum, Operation } from '@/models'

export interface IBalanceResult {
    account: Account
    startVal: number
    credit: number
    debit: number
    result: number
    turnover: number
}

export const useBalanceStore = defineStore('balance', () => {
    
    const accountStore = useAccountStore()
    const opetationStore = useOpetationStore()
    const periodStore = usePeriodStore()

    const isActiveOnly = ref(false)

    const accounts = computed(() => {
        const accountList = accountStore.accountList

        if (isActiveOnly.value) {
            const operationList = operationsInPeriod.value
            return accountList
                .filter((account) => {
                    return operationList.some(op => {
                        return op.creditAccount.id === account.id
                            || op.debitAccount.id === account.id
                    })
                })
        }
    
        return accountList
    })

    const operationsInPeriod = computed(() => {
        const [ startDate, endDate ] = periodStore.toDateRange
        const operationList = opetationStore.operationList

        return operationList
            .filter(i => i.date >= startDate)
            .filter(i => i.date < endDate)
    })

    const operationsBeforePeriod = computed(() => {
        const [ startDate, endDate ] = periodStore.toDateRange
        const operationList = opetationStore.operationList

        return operationList
            .filter(i => i.date < startDate)
    })

    const process = computed(() => {
        const _accounts = accounts.value
        const operations = operationsInPeriod.value
        const prevOperations = operationsBeforePeriod.value

        const result = [] as IBalanceResult[] 

        for (const account of _accounts) {
            const operationsByAccountAndPeriod = account.operationsByAccount(operations)
            const prevOperationsByAccount = account.operationsByAccount(prevOperations)
            const startVal = account.result(prevOperationsByAccount)
                
            const curr = {
                account: account,
                startVal: startVal,
                credit: account.credit(operationsByAccountAndPeriod),
                debit: account.debit(operationsByAccountAndPeriod),
                result: account.result(operationsByAccountAndPeriod) + startVal,
                turnover: account.turnover(operationsByAccountAndPeriod),
            }

            // total.credit += curr.credit
            // total.debit += curr.debit
            // total.result += curr.result
            // total.turnover += curr.turnover

            result.push(curr)
        }

        // result['total'] = total

        return result
    })

    function toLose(creditAccount: Account, sum: number, date = new Date()) {
        const profitAccount = accountStore.profit
        opetationStore.addOperation('Списание', sum, creditAccount, profitAccount, date)
    }

    return {
        toLose, operationsInPeriod, accounts, process, isActiveOnly
    }
})



export const useAccountStore = defineStore('account', () => {
    const accountList = ref([] as Account[])

    function addAccount(accountType: AccountTypeEnum, name: string) {
        const ac = new Account(accountType, name)
        accountList.value.push(ac)
        return ac
    }

    function getAccount(id: number): Account {
        return accountList.value.find(i => i.id === id) as Account
    }

    addAccount(AccountTypeEnum.OwnCapital, 'Начальный капитал')
    addAccount(AccountTypeEnum.OwnCapital, 'Переоценка')
    addAccount(AccountTypeEnum.FixedAsset, 'Аренда квартиры')
    addAccount(AccountTypeEnum.CurrentAsset, 'Карта Маши')

    const profit = addAccount(AccountTypeEnum.OwnCapital, 'Прибыли и убытки')
    const card = addAccount(AccountTypeEnum.CurrentAsset, 'Карта Дени')
    const family = addAccount(AccountTypeEnum.CurrentAsset, 'Семейный счет')
    const cash = addAccount(AccountTypeEnum.CurrentAsset, 'Наличные')
    const vklad = addAccount(AccountTypeEnum.CurrentAsset, 'Вклад')
    const misha = addAccount(AccountTypeEnum.Debt, 'Долг Мише')
    const robot = addAccount(AccountTypeEnum.FixedAsset, 'Робот-пылесос')
    const havka = addAccount(AccountTypeEnum.CurrentAsset, 'Покушоть')

    return { 
        accountList, addAccount, getAccount, 
        profit, family, card, cash, vklad, misha, robot, havka
    }
})

export const useOpetationStore = defineStore('operation', () => {
    const operationList = ref([] as Operation[])

    function addOperation(name: string, val: number, creditAccount: Account, debitAccount: Account, date = new Date()){
        const op = new Operation(name, val, creditAccount, debitAccount, date)
        operationList.value.push(op)
        return op
    }

    function getOperation(id: number) {
        return operationList.value.find(i => i.id === id)
    }

    return { operationList, addOperation, getOperation }
})


export const usePeriodStore = defineStore('period', () => {
    const periodStartDate = ref( new Date() )

    const toWidgetData = computed(() => {
        const currMonth = periodStartDate.value.getMonth()
        const currYear = periodStartDate.value.getFullYear()
        const m = currMonth + 1
        const month = (m < 10) ? `0${m}` : m
        return `${currYear}-${month}`
    })

    const toDateRange = computed(() => {
        const currMonth = periodStartDate.value.getMonth()
        const currYear = periodStartDate.value.getFullYear()
        const startDate = new Date(currYear, currMonth)
        const endDate = new Date(currYear, currMonth + 1)
        return [ startDate, endDate ]
    })

    function setWidgetData(monthYear: string) {
        periodStartDate.value = new Date(monthYear)
    }

    return {
        toWidgetData, toDateRange, setWidgetData
    }
})

