import { AccountType } from '@prisma/client';
import prisma from '../client';

const createAccount = async (name: string, type: AccountType) => {
    return prisma.account.create({
        data: {
            name,
            type,
        }
    })
}

const queryAccounts = async (userId: number, closeAt: Date) => {
    return prisma.account.findMany({
        where: {
            users: {
                some: {
                    id: { equals: userId }
                }
            }
        },
        include: {
            Balances: {
                where: {
                    closeAt: { equals: closeAt }
                },
                select: { value:true }
            }
        }
    })
}

const getAccountById = async (id: number) => {
    return prisma.account.findUnique({
        where: { id }
    })
}

export default {
    getAccountById,
    queryAccounts,
    createAccount,
};