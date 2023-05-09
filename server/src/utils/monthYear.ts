const monthYear = (date = new Date()) => {
    const currMonth = date.getMonth()
    const currYear = date.getFullYear()
    const startDate = new Date(currYear, currMonth)
    const endDate = new Date(currYear, currMonth + 1)
    return { startDate, endDate }
}

export default monthYear