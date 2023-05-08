<template>
    <input type="month" v-model="period" @change="setData">
</template>

<script lang="ts">
import { usePeriodStore } from '@/stores/counter';
import { defineComponent } from 'vue';

const periodStore = usePeriodStore()

export default defineComponent({
    data(){
        return {
            period: periodStore.toWidgetData
        }
    },
    methods: {
        setData(event: any) {
            periodStore.setWidgetData(event.target.value)
        }
    },
    mounted() {
        this.period = periodStore.toWidgetData
    }
})
</script>