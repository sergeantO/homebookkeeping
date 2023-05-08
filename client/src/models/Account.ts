import idCounter from "./IdCounter"
import type { Operation } from "./Operation"

export enum AccountTypeEnum {
    CurrentAsset, 
    FixedAsset, 
    Debt, 
    OwnCapital
}

export class Account {
    id: number
    
    constructor(public type: AccountTypeEnum, public name: string) {
        this.id = idCounter.nextId()
    }

    get isAssetAccount(): boolean {
        if (this.type === AccountTypeEnum.CurrentAsset || this.type === AccountTypeEnum.FixedAsset) {
            return true
        }
        return false
    }

    operationsByAccount(operationList: Operation[]) {
        return operationList.filter(op => op.creditAccount.id === this.id || op.debitAccount.id === this.id)
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