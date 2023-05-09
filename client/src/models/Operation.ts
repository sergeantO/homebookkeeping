import type { Account } from "./Account"

export class Operation {
    
    constructor(
        public id: number,
        public name: string,
        public val: number,
        public creditAccount: Account,
        public debitAccount: Account,
        public createdAt: Date
    ) {
        
    }

}