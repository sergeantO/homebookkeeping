import { Prisma, Balance } from '@prisma/client';
import prisma from '../client';
import monthYear from '../utils/monthYear';
import { accountService, operationService } from '.';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const getBalance = async (accountId: number, date: Date) => {
    const account = await accountService.getAccountById(accountId)
    if (!account) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'account not found');
    }

    let lastBalance = await prisma.balance.findFirst({
        where: {
            acountId: {
                equals: accountId,
            }
        },
        orderBy: {
            deadDateTime: 'desc'
        }
    })

    // если не найден ни один баланс - создаем
    if (!lastBalance) {
        lastBalance = await createBalance(accountId, 0)
    } 
    
    // если найденый баланс не актуален - создаем новый
    const { endDate } = monthYear(date)
    if (lastBalance.deadDateTime < endDate) {
        lastBalance = await createBalance(accountId, lastBalance.endValue)
    }

    // проверяем актуальность баланса
    const lastOperations = await operationService.getOperationsAfterDate(accountId, lastBalance.updatedAt)
    if (lastOperations.length < 1) {
        return lastBalance
    }

    // актуализируем данные в балансе
    const result = lastOperations.reduce((acc, op) => {
        if (op.creditAccountId === accountId) {
            acc.credit += op.value
        }
        if (op.debitAccountId === accountId) {
            acc.debit += op.value
        }
        return acc
    }, { debit: 0, credit: 0 })

    const delta = (accountService.isAssetAccount(account)) 
        ? result.debit - result.credit
        : result.credit - result.debit

    const updatedBalance = await prisma.balance.update({
        where: { id: lastBalance.id },
        data: {
            credit: lastBalance.credit + result.credit,
            debet: lastBalance.debet + result.debit,
            result: delta,
            endValue: lastBalance.startValue + delta
        }
    })
    
    return updatedBalance
}

const createBalance = async (acountId: number, startValue: number) => {
    const { startDate, endDate } = monthYear(new Date())
    return prisma.balance.create({
        data: {
            acountId,
            createdAt: startDate,
            deadDateTime: endDate,
            startValue,
            endValue: startValue,
            credit: 0,
            debet: 0,
            result: 0
        }
    })
}

export default {
    createBalance,
    getBalance,
};