import type { Operation } from "./Operation"

export enum AccountType {
    CURRENT_ASSET, 
    FIXED_ASSET, 
    DEBT, 
    OWN_CAPITAL
}

export class Account {
    
    constructor(public id: number, public type: AccountType, public name: string) {
    }

    get isAssetAccount(): boolean {
        if (this.type === AccountType.CURRENT_ASSET || this.type === AccountType.FIXED_ASSET) {
            return true
        }
        return false
    }

    operationsByAccount(operationList: Operation[]) {
        return operationList.filter(op => op.creditAccount?.id === this.id || op.debitAccount?.id === this.id)
    }

    debit(operationList: Operation[]) {
        return operationList
            .filter(i => i.debitAccount.id === this.id)
            .map(i => i.val)
            .reduce((acc, curr) => acc + curr, 0)
    } 

    credit(operationList: Operation[]) {
        return operationList
            .filter(i => i.creditAccount.id === this.id)
            .map(i => i.val)
            .reduce((acc, curr) => acc + curr, 0)
    } 

    turnover(operationList: Operation[]) {
        if (this.isAssetAccount) { 
            return this.debit(operationList)
        } else {
            return this.credit(operationList)
        }
    }

    result(operationList: Operation[]) {
        const balanceDebit = this.debit(operationList)
        const balanceCredit = this.credit(operationList)
        const delta = balanceDebit - balanceCredit

        if (this.isAssetAccount) {
            return delta
        } else {
            return -delta
        }
    }
}