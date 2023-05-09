<template>
    <div>
        <input type="checkbox" name="activeOnlyCheckbox" id="activeOnlyCheckbox" v-model="store.isActiveOnly"> 
        <label for="activeOnlyCheckbox">Только активные счета</label>
    </div>
</template>

<script lang="ts">

import { useAccountStore } from '@/stores';
import { defineComponent } from 'vue';

const accountStore = useAccountStore()

export default defineComponent({
    computed: {
        store() {
            return accountStore
        }
    }
})
</script>

<style scoped>
input[name=activeOnlyCheckbox] {
    display: inline-block;
    margin-right: 10px;
}
</style>