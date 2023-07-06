import { Account, AccountType, Operation, Prisma, User } from '@prisma/client';
import prisma from '../client';
import operationService from './operation.service';

const createAccount = async (name: string, type: AccountType, user: User, isClosable?: boolean) => {
    return prisma.account.create({
        data: {
            name,
            type,
            isClosable,
            users: { 
                create: {
                    userId: user.id,
                    userIsOwner: true,
                }
            }
        }
    })
}

const shareAccount = async (accountId: number, userId: number) => {
    return prisma.account.update({
        where: {
            id: accountId,
        },
        data: {
            users: {
                create: {
                    userId: accountId
                }
            }
        }
    })
}

const createProfitAccount = async (user: User) => {
    return prisma.account.create({
        data: {
            name: 'Прибыли и убытки',
            type: AccountType.OWN_CAPITAL,
            isUserProfit: true,
            users: { connect: [ { id: user.id } ] }
        }
    })
}

const isAssetAccount = (account: Account) => {
    if (account.type === AccountType.CURRENT_ASSET || account.type === AccountType.FIXED_ASSET) {
        return true
    }
    return false
}

const queryAccounts = async (userId: number) => {
    return await prisma.account.findMany({
        where: {
            users: {
                some: {
                    id: { equals: userId }
                }
            }
        },
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
    createProfitAccount,
    shareAccount,
};