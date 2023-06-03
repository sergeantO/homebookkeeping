import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { authService, userService, tokenService, emailService, accountService, balanceService, operationService } from '../services';
import exclude from '../utils/exclude';
import { Balance, Operation, Account } from '@prisma/client';
import pick from '../utils/pick';
import { User } from '@prisma/client';

const getAccounts = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['monthYear']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    
    const user = req.user as User
    const userId = user.id

    const closeAt = new Date()
    
    const accounts = await accountService.queryAccounts(userId, closeAt)
    
    res.send(accounts);
})

const getBalance = catchAsync(async(req,res) => {
    
})

const getOperations = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['monthYear']);
    const date = new Date()
    const accountId = 1
    const operations = await operationService.getOperations(date)

    res.send(operations);
})

const removeOperation = catchAsync(async(req,res) => {
    const id = +req.params.operId
    const operation = await operationService.removeById(id)
    res.status(httpStatus.OK).send(operation);
})

const createOperation = catchAsync(async (req, res) => {
    const { name, value, debitAccount, creditAccount } = req.body
    const user = req.user as User
    const userId = user.id
    const operation = await operationService.createOperation(name, value, debitAccount, creditAccount, userId);
    res.status(httpStatus.CREATED).send(operation);

})

const createAccount = catchAsync(async (req, res) => {
    const { name, type } = req.body
    const account = await accountService.createAccount(name, type)
    res.status(httpStatus.CREATED).send(account);
})

export default {
    getAccountsWithBalance: getAccounts,
    getOperations,
    removeOperation,
    createOperation,
    createAccount
}