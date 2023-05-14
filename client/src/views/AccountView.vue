<template>
    <q-page class="q-pa-lg">

        <div class="row q-mb-md">
            <div class="col-12">
                <h3 class="q-mt-none">{{ acount ? `Счет /${acount.name}` : 'Счета'}}</h3>
            </div>
            <!-- <div class="col">
                <ActiveOnlyCheckbox />
            </div>
            <div class="col">
                <Period />
            </div> -->
        </div>

        <CreateAccount />

        <div class="row">
            <div class="col-12">

                <q-markup-table v-if="acount">
                    <thead>
                        <th>операция</th>
                        <th>кор. счет</th>
                        <th>Дебет</th>
                        <th>кредит</th>
                        <th>Дата</th>
                    </thead>
                    <tbody>
                        <tr>
                            <th colspan="2">Начальный остаток</th>
                            <th>{{ (acount.isAssetAccount) ? balance?.startVal : '' }}</th>
                            <th>{{ (!acount.isAssetAccount) ? balance?.startVal : '' }}</th>
                        </tr>
                        <tr>
                            <td><q-input outlined v-model="name" :dense="true" /></td>
                            <td><q-select outlined v-model="secondAccount" :options="allAccounts" /></td>
                            <td><q-input outlined type="number" v-model.number="debit" class="w-100" :dense="true" /></td>
                            <td><q-input outlined type="number" v-model.number="credit" class="w-100" :dense="true" /></td>
                            <td><q-btn  @mouseup="addOperation" round outline size="sm" color="primary" icon="done" /></td>
                        </tr>
                        <AccountOperation v-for="op in operations" :key="op.id" :operation="op" :account="acount" />
                        <tr>
                            <th colspan="2">Оборот</th>
                            <th>{{ totalDebit }}</th>
                            <th>{{ totalCredit }}</th>
                        </tr>
                        <tr>
                            <th colspan="2">Итог</th>
                            <th>{{ (acount.isAssetAccount) ? totalDebit - totalCredit : 0 }}</th>
                            <th>{{ (acount.isAssetAccount) ? 0 : totalCredit - totalDebit }}</th>
                        </tr>
                        <tr>
                            <th colspan="2">Итоговый остаток</th>
                            <th>{{ (acount.isAssetAccount) ? balance?.endVal : 0 }}</th>
                            <th>{{ (acount.isAssetAccount) ? 0 : balance?.endVal }}</th>
                        </tr>
                    </tbody>
                </q-markup-table>

            </div>
        </div>
    </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AccountOperation from '@/components/AccountOperation.vue';
import ActiveOnlyCheckbox from '@/components/ActiveOnlyCheckbox.vue'
import CreateAccount from '@/components/CreateAccount.vue';
import Period from '@/components/Period.vue';
import SelectedList from '@/components/SelectedList.vue';
import { useAccountStore, useOpetationStore, useBalanceStore } from '@/stores';
import { notify } from '@/services/Notify';

const accountStore = useAccountStore()
const opetationStore = useOpetationStore()
const balanceStore = useBalanceStore()

export default defineComponent({
    components: {
        AccountOperation: AccountOperation,
        Period: Period,
        SelectedList: SelectedList,
        ActiveOnlyCheckbox: ActiveOnlyCheckbox,
        CreateAccount
    },
    data() {
        return {
            name: '',
            debit: 0,
            credit: 0,
            secondAccount: undefined as object | undefined
        }
    },
    computed: {
        acount() {
            const id = +this.$route.params.id
            return accountStore.getAccount(id)
        },
        balance() {
            const id = +this.$route.params.id
            return balanceStore.process.find(b => b.account.id === id)
        },
        operations() {
            if (!this.acount) {
                return []
            } else {
                const account = this.acount
                return opetationStore.operationsInPeriod
                    .filter(i => i.creditAccount.id === account.id || i.debitAccount.id === account.id)
            }
        },
        totalDebit() {
            return this.operations.reduce((acc, curr) => {
                if (curr.debitAccount === this.acount) {
                    acc += curr.val
                }
                return acc
            }, 0)
        },
        totalCredit() {
            return this.operations.reduce((acc, curr) => {
                if (curr.creditAccount === this.acount) {
                    acc += curr.val
                }
                return acc
            }, 0)
        },
        allAccounts() {
            return accountStore.activeAccounts
                .map((acc) => ({ label: acc.name, value: acc.id }))
        },
        activeAccounts() {
            return accountStore.activeAccounts.filter(i => i.isAssetAccount)
        },
        passiveAccounts() {
            return accountStore.activeAccounts.filter(i => !i.isAssetAccount)
        },
    },
    methods: {
        addOperation() {
            const secondAccountData = this.secondAccount as any
            if (!secondAccountData) return
            const secondAccount = accountStore.getAccount(secondAccountData.value)
            
            if (!secondAccount || !this.acount) return

            if (this.debit > 0) {
                opetationStore.addOperation(this.name, this.debit, secondAccount, this.acount)
                    .then(() => {
                        notify.success('Операция успешно созданна')
                    })
            } else if (this.credit > 0) {
                opetationStore.addOperation(this.name, this.credit, this.acount, secondAccount)
                    .then(() => {
                        notify.success('Операция успешно созданна')
                    })
            }
        }
    }
})
</script>

<style scoped>
.account-menu {
    max-width: 200px;
    margin-right: 2rem;
}

.accountList {
    margin-bottom: 2rem;
}

.accountList h3 {
    margin-bottom: .5rem;
    text-transform: uppercase;
}

.accountList>ul {
    list-style: none;
    padding-left: 0;
}
</style>
