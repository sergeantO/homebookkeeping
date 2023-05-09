<template>
    <div class="row my-2">
        <div class="col">
            <h1>Операции </h1>
        </div>
        <div class="col">
            <Period />
        </div>
    </div>
    
    <div class="row my-2">
        <div class="col">
            <table>
                <thead>
                    <th>#</th>
                    <th>содержание опреации</th>
                    <th>дебит</th>
                    <th>кредит</th>
                    <th>сумма</th>
                    <th>дата</th>
                </thead>
                <tbody>
                    <tr>
                        <td><button class="add-button" :disabled="isDisabledAddButton" @mouseup="addOperation">+</button></td>
                        <td><input type="text" v-model="name" class="w-100"></td>
                        <td>
                            <SelectedList :select="debitAccount?.id" :options="accounts" @select="setDebitAccount"/>
                        </td>
                        <td>
                            <SelectedList :select="creditAccount?.id" :options="accounts" @select="setCreditAccount"/>
                        </td>
                        <td><input type="number" v-model="val" class="w-100"></td>
                        <td></td>
                    </tr>
                    <Operation v-for="op in operations" key="op.id" :operation="op"/>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">

import Operation from '@/components/Operation.vue'
import SelectedList from '@/components/SelectedList.vue';
import Period from '@/components/Period.vue';
import type { Account } from '@/models';
import { defineComponent } from 'vue';
import { useAccountStore, useOpetationStore } from '@/stores';

const accountStore = useAccountStore()
const opetationStore = useOpetationStore()

export default defineComponent({
    components: {
        Operation,
        SelectedList,
        Period
    },
    data() {
        return {
            period: null,
            debitAccount: undefined as Account | undefined,
            creditAccount: undefined as Account | undefined,
            name: '',
            val: 0,
        }
    },
    computed: {
        operations() {
            return opetationStore.operationsInPeriod
        },
        accounts() {
            return accountStore.accountList
        },
        isDisabledAddButton() {
            return typeof this.creditAccount === "undefined" 
                || typeof this.debitAccount === "undefined"
                || this.val < 1
                || !this.name
        }
    },
    methods: {
        setDebitAccount(accountId: number) {
            this.debitAccount = accountStore.getAccount( accountId )
        },
        setCreditAccount(accountId: number) {
            this.creditAccount = accountStore.getAccount( accountId )
        },
        addOperation() {
            if (!this.isDisabledAddButton) {
                opetationStore.addOperation(this.name, this.val, this.creditAccount as Account, this.debitAccount as Account)
                
                this.name = ''
                this.val = 0
                this.creditAccount = undefined
                this.debitAccount = undefined
            }
            
        },
        
    }
})
</script>

<style>
.w-100 {
    width: 100%;
}
</style>