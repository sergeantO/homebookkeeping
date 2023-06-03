import type { Account } from "./Account"

import { date } from 'quasar'

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

    get isEditable() {
        const date1 = new Date()
        const unit = 'days'

        const diff = date.getDateDiff(date1, this.createdAt, unit)

        return (diff < 3)
    }

}