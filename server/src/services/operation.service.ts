import prisma from '../client';
import monthYear from '../utils/monthYear';

const createOperation = (
    name: string, 
    value: number, 
    debitAccountId: number,
    creditAccountId: number,
    userId: number
) => {
    return prisma.operation.create({
        data: {
            name,
            value,
            debitAccountId,
            creditAccountId,
            userId
        }
    })
}

const getOperationsBeforeDate = (accountId: number, endDate: Date) => {
    return prisma.operation.findMany({
        where: {
            AND: {
                OR: {
                    creditAccountId: { equals: accountId },
                    debitAccountId: { equals: accountId },
                },
                createdAt: { 
                    lt: endDate
                },
            }
        }
    })
}


const getOperationsAfterDate = (accountId: number, startDate: Date) => {
    return prisma.operation.findMany({
        where: {
            AND: {
                OR: {
                    creditAccountId: { equals: accountId },
                    debitAccountId: { equals: accountId },
                },
                createdAt: { 
                    gte: startDate
                },
            }
        }
    })
}

const getOperationsBetween = (accountId: number, startDate: Date, endDate: Date) => {
    return prisma.operation.findMany({
        where: {
            AND: {
                OR: {
                    creditAccountId: { equals: accountId },
                    debitAccountId: { equals: accountId },
                },
                createdAt: { 
                    gte: startDate,
                    lt: endDate
                },
            }
        }
    })
}

const getOperations = (date: Date) => {
    const { startDate, endDate } = monthYear(date)
    return prisma.operation.findMany({
        where: {
            createdAt: { 
                gte: startDate,
                lt: endDate
            },
        }
    })
}

const queryOperations = (accountId: number, date: Date) => {
    const { startDate, endDate } = monthYear(date)
    return prisma.operation.findMany({
        where: {
            AND: {
                OR: {
                    creditAccountId: { equals: accountId },
                    debitAccountId: { equals: accountId },
                },
                createdAt: { 
                    gte: startDate,
                    lt: endDate
                },
            }
            
            
        }
    })
}

export default {
    queryOperations,
    createOperation,
    getOperations,
    getOperationsBetween,
    getOperationsAfterDate,
    getOperationsBeforeDate
}