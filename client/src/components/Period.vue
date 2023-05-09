<template>
    <input type="month" class="monthWidget" v-model="period" @change="setData">
</template>

<script lang="ts">

import { usePeriodStore } from '@/stores';
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

<style scoped>
.monthWidget {
    padding: .25rem 1rem;
    max-width: 250px;
}
</style>