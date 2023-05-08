<template>
    <div>
        <input type="checkbox" name="activeOnlyCheckbox" id="activeOnlyCheckbox" v-model="store.isActiveOnly"> 
        <label for="activeOnlyCheckbox">Только активные</label>
    </div>
</template>

<script lang="ts">
import { useBalanceStore } from '@/stores/counter';
import { defineComponent } from 'vue';

const balanceStore = useBalanceStore()

export default defineComponent({
    computed: {
        store() {
            return balanceStore
        }
    }
})
</script>