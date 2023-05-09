import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const usePeriodStore = defineStore('period', () => {
    const periodStartDate = ref( new Date() )

    const toWidgetData = computed(() => {
        const currMonth = periodStartDate.value.getMonth()
        const currYear = periodStartDate.value.getFullYear()
        const m = currMonth + 1
        const month = (m < 10) ? `0${m}` : m
        return `${currYear}-${month}`
    })

    const toDateRange = computed(() => {
        const currMonth = periodStartDate.value.getMonth()
        const currYear = periodStartDate.value.getFullYear()
        const startDate = new Date(currYear, currMonth)
        const endDate = new Date(currYear, currMonth + 1)
        return [ startDate, endDate ]
    })

    function setWidgetData(monthYear: string) {
        periodStartDate.value = new Date(monthYear)
    }

    return {
        toWidgetData, toDateRange, setWidgetData
    }
})