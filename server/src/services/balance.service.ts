import { Prisma, Balance } from '@prisma/client';
import prisma from '../client';
import monthYear from '../utils/monthYear';

const getBalance = async (accountId: number, closeAt: Date) => {
    return prisma.balance.findFirst({
        where: {
            AND: {
                closeAt: {
                    equals: closeAt,
                },
                acountId: {
                    equals: accountId,
                }
            }
        }
    })
}

const createBalance = async (acountId: number, value: number) => {
    const { endDate } = monthYear()
    return prisma.balance.create({
        data: {
            value,
            acountId,
            closeAt: endDate
        }
    })
}

export default {
    createBalance,
    getBalance,
};