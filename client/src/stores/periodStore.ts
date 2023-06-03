import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { date } from 'quasar'

const defaultPeriod = () => {
    const currDate = new Date()
    const currMonth = currDate.getMonth()
    const currYear = currDate.getFullYear()
    const defaultFrom = new Date(currYear, currMonth)
    const defaultTo = date.subtractFromDate( new Date(currYear, currMonth + 1), { day: 1 })

    return { 
        from: date.formatDate(defaultFrom, 'DD.MM.YYYY'), 
        to: date.formatDate(defaultTo, 'DD.MM.YYYY'), 
    }
}

const savedPeriod = () => {
    const period = localStorage.getItem('period')
    return (period) ? JSON.parse(period) : null
}


export const usePeriodStore = defineStore('period', () => {
    const period = savedPeriod() || defaultPeriod()

    const dateRange = ref(period)

    const toDate = computed(() => {
        const val = dateRange.value

        const from = (val?.from) ?  date.extractDate(val.from, 'DD.MM.YYYY') : new Date()
        const to = (val?.to) ?  date.extractDate(val.to, 'DD.MM.YYYY') : new Date()
       
        return {
            from, 
            to,
        }
    })

    const save = () => {
        localStorage.setItem('period', JSON.stringify(dateRange.value))
    }

    return {
        toDate, dateRange, save
    }
})