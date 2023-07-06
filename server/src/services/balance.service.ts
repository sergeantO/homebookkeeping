import { Account, Operation, Prisma, User } from '@prisma/client';
import { operationService } from '.';
import prisma from '../client';

const getBalances = async (beforeDate: Date, user: User) => {
    
    // начало и конец периода
    const endDate = new Date(beforeDate)  // current date
    endDate.setDate(1)                    // going to 1st of the month
    endDate.setHours(0)
    endDate.setMinutes(0)
    endDate.setSeconds(-1)                 // going to last hour before this date even started.
    const year = endDate.getFullYear()
    const month = endDate.getMonth()

    return prisma.balanceHistory.findMany({
        where: {
            year,
            month,
            account: {
                users: {
                    some: {
                        id: { equals: user.id }
                    }
                }
            }
        }
    })

}

const closePeriod = async () => {

    // определяем даты начала и конеца отчетного периода
    const d = new Date();   // current date
    const currYear = d.getFullYear()
    const currMonth = d.getMonth()
    const startDate = new Date(currYear, currMonth - 1, 1, 0, 0, 0)
    const endDate = new Date(currYear, currMonth, 1, 0, 0, 0) 

    // находим все счета
    const allAccounts = await prisma.account.findMany({
        where: { 
            isUserProfit: false
        },
        include: { users: { include: { user: true } } }
    })

    // находим все операции за прошлый месяц
    const operationListInPeriod = await prisma.operation.findMany({
        where: {
            createdAt:  {
                gte: startDate,
                lt: endDate,
            }
        }
    })

    // на основе операций расчитываем итоги за месяц по счетам
    const deltas = operationListInPeriod.reduce((acc, op) => {
        const creditAcc = acc.get(op.creditAccountId) || 0
        const debitAcc = acc.get(op.debitAccountId) || 0

        acc.set(op.creditAccountId, creditAcc - op.value)
        acc.set(op.debitAccountId, debitAcc + op.value)

        return acc
    }, new Map<number, number>())

    // находим счет прибыли/убытки для каждого пользователя
    const profitAccounts = allAccounts
        .filter(i => i.isUserProfit)
        .reduce((acc, account) => {
            const ownerId = account.users.find(i => i.userIsOwner)?.userId
            if (ownerId) {
                acc.set(ownerId, account.id)
            }
            return acc
        }, new Map<number, number>)

    /* для всех закрываемых счетов создаем списания в профитный счет владельца счета, 
     * его итог за месяц становится 0
     */
    const closeOperationList: Prisma.Prisma__OperationClient<Operation, never>[] = []
    // закрываем счета 
    allAccounts
        .filter(i => i.isClosable)
        .forEach((closableAccount) => {
            const ownerId = closableAccount.users.find(i => i.userIsOwner)?.userId
            if (ownerId) {
                const targetAccountId = profitAccounts.get(ownerId)
                const value = deltas.get(closableAccount.id)
                if (targetAccountId && value) {
                    const op = operationService.createOperation('закрытие счета', value,  targetAccountId, closableAccount.id, ownerId, endDate)
                    closeOperationList.push(op)
                    deltas.set(closableAccount.id, 0)
                }
            }
        
    })
    
    // находим последний баланс для каждого счета
    const prevDate = new Date(currYear, currMonth - 2, 1, 0, 0, 0)
    const prevYear = prevDate.getFullYear()
    const prevMonth = prevDate.getMonth()
    const history = await prisma.balanceHistory.findMany({
        where: {
            year: prevYear,
            month: prevMonth,
        }
    })

    const prevValues = new Map<number, number>()
    history.forEach((hb) => {
        prevValues.set(hb.acountId, hb.value)
    })

    // Считаем остатки
    // создаем балансовую запись для каждого счета на текущий месяц
    // создаем новые балансы
    const balancePromiseList = allAccounts.map((ac) => {
        const prevVal = prevValues.get(ac.id) || 0
        let delta = deltas.get( ac.id ) || 0
        if (ac.type === 'DEBT' || ac.type === 'OWN_CAPITAL') {
            delta *= -1
        }
        const value = prevVal + delta

        return prisma.balanceHistory.create({
            data: {
                year: currYear,
                month: currMonth,
                acountId: ac.id,
                prevValue: prevVal,
                monthDelta: delta,
                value: value
            }
        })
    })

   const operationList = await Promise.all(closeOperationList)
   const balanceList   = await Promise.all(balancePromiseList)

   return { operationList, balanceList }

}

export default {
    closePeriod,
    getBalances,
};