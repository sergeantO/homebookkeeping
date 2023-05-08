import type { Account } from "./Account"
import idCounter from "./IdCounter"

export class Operation {
    id: number

    constructor(
        public name: string,
        public val: number,
        public creditAccount: Account,
        public debitAccount: Account,
        public date = new Date()
    ) {
        this.id = idCounter.nextId()
    }

}