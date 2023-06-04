import { Prisma, User } from '@prisma/client';
import prisma from '../client';
import moment from 'moment';

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

const removeById = (id: number) => {
    return prisma.operation.delete({
        where: {
          id: id,
        },
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

const getOperations = (from: Date, to: Date, user: User) => {
    const formatedFrom = moment(from).format('YYYY-MM-DD')
    const formatedTo =  moment(to).format('YYYY-MM-DD')

    const sql = Prisma.sql `
        SELECT op.id, op.name, op.value, op.createdAt, op.creditAccountId, op.debitAccountId
        FROM Operation as op
        LEFT JOIN Account as acc
        ON acc.id = op.creditAccountId
        OR acc.id = op.debitAccountId
        RIGHT JOIN _AccountToUser
        ON acc.id = _AccountToUser.A
        LEFT JOIN User as u
        ON u.id = _AccountToUser.B
        WHERE (op.createdAt BETWEEN ${formatedFrom} AND ${formatedTo})
        AND u.id = ${user.id}
        ORDER BY op.createdAt DESC;
    `

    return prisma.$queryRaw(sql)
}

export default {
    createOperation,
    getOperations,
    getOperationsAfterDate,
    getOperationsBeforeDate,
    removeById,
}