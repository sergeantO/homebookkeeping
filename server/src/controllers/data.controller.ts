import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { authService, userService, tokenService, emailService, accountService, balanceService, operationService } from '../services';
import exclude from '../utils/exclude';
import { Balance, Operation, Account } from '@prisma/client';
import pick from '../utils/pick';

const getAccountsWithBalance = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['monthYear']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    
    const closeAt = new Date()
    const userId = 1
    const accounts = await accountService.queryAccounts(userId, closeAt)
    
    res.send(accounts);
})

const getOperations = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['monthYear']);
    const date = new Date()
    const accountId = 1
    const operations = await operationService.queryOperations(accountId, date)

    res.send(operations);
})

const createOperation = catchAsync(async (req, res) => {
    const { name, value, debitAccount, creditAccount } = req.body
    const userId = 1
    const operation = await operationService.createOperation(name, value, debitAccount, creditAccount, userId);
    res.status(httpStatus.CREATED).send(operation);
})

const createAccount = catchAsync(async (req, res) => {
    const { name, type } = req.body
    const account = accountService.createAccount(name, type)
    res.status(httpStatus.CREATED).send(account);
})

export default {
    getAccountsWithBalance,
    getOperations,
    createOperation,
    createAccount
}