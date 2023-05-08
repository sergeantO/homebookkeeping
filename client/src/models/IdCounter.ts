class IdCounter {
    currId = 1
    nextId() {
        this.currId += 1
        return this.currId
    }
}

const idCounter = new IdCounter()
export default idCounter