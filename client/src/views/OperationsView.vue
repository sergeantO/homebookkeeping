<template>
    <q-page class="q-pa-lg">
        <div class="row q-mb-md">
            <div class="col-12">
                <h3 class="q-mt-none q-mb-md">Операции </h3>
            </div>
            <!-- <div class="col">
            <Period />
        </div> -->
        </div>

        <div class="row">
            <div class="col-12">

                <q-markup-table>
                    <thead>
                        <th>#</th>
                        <th>содержание опреации</th>
                        <th>Дебет</th>
                        <th>кредит</th>
                        <th style="width: 15%;">сумма</th>
                        <th>дата</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#</td>
                            <td><q-input outlined v-model="name" :dense="true" /></td>
                            <td><q-select outlined v-model="debitAccountData" :options="accounts" /></td>
                            <td><q-select outlined v-model="creditAccountData" :options="accounts" /></td>
                            <td><q-input outlined type="number" v-model.number="val" :dense="true" /></td>
                            <td> <q-btn  :disabled="isDisabledAddButton" @mouseup="addOperation" round outline size="sm" color="primary" icon="done" /></td>
                        </tr>
                        <Operation v-for="op in operations" key="op.id" :operation="op" />
                    </tbody>
                </q-markup-table>

            </div>
        </div>
    </q-page>
</template>

<script lang="ts">

import Operation from '@/components/Operation.vue'
import SelectedList from '@/components/SelectedList.vue';
import Period from '@/components/Period.vue';
import type { Account } from '@/models';
import { defineComponent } from 'vue';
import { useAccountStore, useOpetationStore } from '@/stores';
import { notify } from '@/services/Notify';

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
            debitAccountData: undefined as { label: string, value: number } | undefined,
            creditAccountData: undefined as { label: string, value: number } | undefined,
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
                .map((ac) => ({ label: ac.name, value: ac.id }))
        },
        creditAccount() {
            const accountId = this.creditAccountData?.value
            if (!accountId) return
            return accountStore.getAccount(accountId)
        },
        debitAccount() {
            const accountId = this.debitAccountData?.value
            if (!accountId) return
            return accountStore.getAccount(accountId)
        },
        isDisabledAddButton() {
            return !this.creditAccount
                || !this.debitAccount
                || this.creditAccount === this.debitAccount
                || this.val < 1
                || !this.name
        }
    },
    methods: {
        addOperation() {

            if (!this.isDisabledAddButton) {
                opetationStore.addOperation(this.name, this.val, this.creditAccount as Account, this.debitAccount as Account)
                    .then(() => {
                        notify.success('Операция успешно созданна')
                    })

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