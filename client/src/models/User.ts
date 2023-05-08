import idCounter from "./IdCounter"

export class User {
    id: number
    constructor(public name: string) {
        this.id = idCounter.nextId()
    }
}