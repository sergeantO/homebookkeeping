<template>
     <div class="row my-2">
        <div class="col">
            <input type="text" v-model="newAccountName">
        </div>
        <div class="col">
            <select v-model="newAccountType">
                <option value="0" selected>Оборотные активы</option>
                <option value="1">Внеоборотные активы</option>
                <option value="2">Долги</option>
                <option value="3">Собственный капитал</option>
            </select>
        </div>
        <div class="col">
            <button @mouseup="createAccount()">Создать счет</button>
        </div>
    </div>
</template>

<script lang="ts">
import type { AccountTypeEnum } from '@/models';
import { useAccountStore } from '@/stores';
import { defineComponent } from 'vue';

const accountStore = useAccountStore()

export default defineComponent({
    data() {
        return {
            newAccountName: '',
            newAccountType: 0 as AccountTypeEnum 
        }
    },
    methods: {
        createAccount() {
            const newAccountType = +this.newAccountType
            const newAccountName = this.newAccountName
            if (newAccountName.length > 0) {
                this.newAccountName = ''
                accountStore.addAccount(newAccountType, newAccountName)
           }
        },
    }
})
</script>