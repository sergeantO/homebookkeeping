import { Account, AccountType } from '@prisma/client';
import prisma from '../client';

const createAccount = async (name: string, type: AccountType) => {
    return prisma.account.create({
        data: {
            name,
            type,
        }
    })
}

const isAssetAccount = (account: Account) => {
    if (account.type === AccountType.CURRENT_ASSET || account.type === AccountType.FIXED_ASSET) {
        return true
    }
    return false
}

const queryAccounts = async (userId: number, closeAt: Date) => {
    return await prisma.account.findMany({
        // where: {
        //     users: {
        //         some: {
        //             id: { equals: userId }
        //         }
        //     }
        // },
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
    isAssetAccount,
};