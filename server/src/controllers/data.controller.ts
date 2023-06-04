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
    
    const accounts = await accountService.queryAccounts(userId)
    
    res.send(accounts);
})

const getOperations = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['from', 'to']);
    const from = new Date(+(filter.from as string))
    const to = new Date(+(filter.to as string))
    const user = req.user as User

    const operations = await operationService.getOperations(from, to, user)
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
    const user = req.user as User
    const { name, type } = req.body
    const account = await accountService.createAccount(name, type, user)
    res.status(httpStatus.CREATED).send(account);
})

export default {
    getAccountsWithBalance: getAccounts,
    getOperations,
    removeOperation,
    createOperation,
    createAccount
}