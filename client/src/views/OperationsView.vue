<template>
    <q-page class="q-pa-lg">
        <div class="row q-mb-lg justify-between items-center">
            <div class="col-12">
                <h3 class="q-my-none">/Операции </h3>
            </div>
            <div></div>
        </div>

        <div class="row q-mb-md q-col-gutter-md">
            <div class="col-12 col-md-5"><q-input filled bg-color="white"  label="Содержание опреации"  v-model="name"  /></div>
            <div class="col-6 col-md-2"><q-select filled bg-color="white" label="Дебетовый счет"  v-model="debitAccountData"  :options="accounts" /></div>
            <div class="col-6 col-md-2"><q-select filled bg-color="white" label="Кредитовый счет"  v-model="creditAccountData" :options="accounts" /></div>
            <div class="col-6 col-md-2"><q-input filled bg-color="white" label="Сумма"  type="number" v-model.number="val" /></div>
            <div class="col-6 col-md-1"><q-btn  :disabled="isDisabledAddButton" @mouseup="addOperation"  color="primary" icon="add" /> </div>
        </div>

        <div class="row">
            <div class="col-12">

                <q-markup-table>
                    <thead>
                        <th>#</th>
                        <th>содержание опреации</th>
                        <th>Дебетовый счет</th>
                        <th>Кредитовый счет</th>
                        <th>сумма</th>
                        <th>дата</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <Operation v-for="op in operations" key="op.id" :operation="op" @remove="remove" />
                    </tbody>
                </q-markup-table>

            </div>
        </div>
    </q-page>
</template>

<script lang="ts">

import Operation from '@/components/Operation.vue'
import SelectedList from '@/components/SelectedList.vue';
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
    },
    data() {
        return {
            debitAccountData: undefined as { label: string, value: number } | undefined,
            creditAccountData: undefined as { label: string, value: number } | undefined,
            name: '',
            val: undefined as number | undefined,
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
                || !this.val
                || this.val < 1
                || !this.name
        }
    },
    methods: {
        remove(id: number) {
            opetationStore.remove(id)
        },
        addOperation() {

            if (!this.isDisabledAddButton) {
                opetationStore.addOperation(this.name, this.val as number, this.creditAccount as Account, this.debitAccount as Account)
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