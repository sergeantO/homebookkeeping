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
            <div class="table-wrapper">
            <table>
                <thead>
                    <th>#</th>
                    <th>содержание опреации</th>
                    <th>дебит</th>
                    <th></th>
                    <th>кредит</th>
                    <th>сумма</th>
                    <th>дата</th>
                </thead>
                <tbody>
                    <tr>
                        <td><button class="add-button" :disabled="isDisabledAddButton" @mouseup="addOperation">+</button></td>
                        <td><input type="text" v-model="name" class="w-100"></td>
                        <td>
                            <SelectedList :select="debitAccountId" :options="accounts" @select="setDebitAccountId"/>
                        </td>
                        <td>
                            <button @click="swapAccounts()">swap</button>
                        </td>
                        <td>
                            <SelectedList :select="creditAccountId" :options="accounts" @select="setCreditAccountId"/>
                        </td>
                        <td><input type="number" v-model="val" class="w-100"></td>
                        <td></td>
                    </tr>
                    <Operation v-for="op in operations" key="op.id" :operation="op"/>
                </tbody>
            </table>
            </div>
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
            debitAccountId: 0,
            creditAccountId: 0,
            name: '',
            val: 0,
        }
    },
    computed: {
        operations() {
            return opetationStore.operationsInPeriod
        },
        accounts() {
            return accountStore.activeAccounts
        },
        creditAccount() {
            const account = this.creditAccountId
            return accountStore.getAccount( account )
        },
        debitAccount() {
            const account = this.debitAccountId
            return accountStore.getAccount( account )
        },
        isDisabledAddButton() {
            return !this.creditAccount
                || !this.debitAccount
                || this.creditAccountId === this.debitAccountId
                || this.val < 1
                || !this.name
        }
    },
    methods: {
        setDebitAccountId(accountId: number) {
            this.debitAccountId = accountId 
        },
        setCreditAccountId(accountId: number) {
            this.creditAccountId =  accountId 
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
        swapAccounts() {
            const tmpDeb = this.debitAccountId
            const tmpCre = this.creditAccountId
            this.setCreditAccountId(tmpDeb)
            this.setDebitAccountId(tmpCre)
        }
        
    }
})
</script>

<style>
.w-100 {
    width: 100%;
}
</style>