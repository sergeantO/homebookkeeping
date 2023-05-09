<template>
    
    <div class="row my-2">
        <div class="col">
            <h1>Счета</h1>
        </div>
        <div class="col">
            <ActiveOnlyCheckbox />
        </div>
        <div class="col">
            <Period />
        </div>
    </div>

    <CreateAccount />

    <div class="row my-2">
        <div class="col account-menu">
            <div class="accountList">
                <h3>Активные счета</h3>
                <ul>
                    <li v-for="acc of activeAccounts" :key="acc.id">
                        <RouterLink :to="{ name: 'account', params: { id: acc.id } }">{{ acc.name }}</RouterLink>
                    </li>
                </ul>
            </div>
            
            <div class="accountList">
                <h3>Пассивные счета</h3>
                <ul>
                    <li v-for="acc of passiveAccounts" :key="acc.id">
                        <RouterLink :to="{ name: 'account', params: { id: acc.id } }">{{ acc.name }}</RouterLink>
                    </li>
                </ul>
            </div>
            
        </div>

        <div class="col">
            <div class="table-wrapper">
                <table v-if="acount">
                    <thead>
                        <th>операция</th>
                        <th>кор. счет</th>
                        <th>дебит</th>
                        <th>кредит</th>
                    </thead>
                    <tbody>
                        <tr>
                            <th colspan="2">Начальный остаток</th>
                            <th>{{ (acount.isAssetAccount) ? balance?.startVal : '' }}</th>
                            <th>{{ (!acount.isAssetAccount) ? balance?.startVal : '' }}</th>
                        </tr>
                        <tr>
                            <td>
                                <button @mouseup="addOperation">+</button>
                                <input type="text" v-model="name">
                            </td>
                            <td>
                                <SelectedList :select="secondAccount?.id" :options="allAccounts" @select="setSecondAccount"/>
                            </td>
                            <td><input type="number" v-model="debit" class="w-100"></td>
                            <td><input type="number" v-model="credit" class="w-100"></td>
                        </tr>
                        <AccountOperation v-for="op in operations" :key="op.id" :operation="op" :account="acount" />
                        <tr>
                            <th colspan="2">Оборот</th>
                            <th>{{ totalDebit }}</th>
                            <th>{{ totalCredit }}</th>
                        </tr>
                        <tr>
                            <th colspan="2">Итог</th>
                            <th>{{ (acount.isAssetAccount) ? totalDebit - totalCredit : '' }}</th>
                            <th>{{ (acount.isAssetAccount) ? '' : totalCredit - totalDebit }}</th>
                        </tr>
                        <tr>
                            <th colspan="2">Итоговый остаток</th>
                            <th>{{ (acount.isAssetAccount) ?  balance?.endVal : '' }}</th>
                            <th>{{ (acount.isAssetAccount) ? '' : balance?.endVal }}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AccountOperation from '@/components/AccountOperation.vue';
import ActiveOnlyCheckbox from '@/components/ActiveOnlyCheckbox.vue'
import CreateAccount from '@/components/CreateAccount.vue';
import Period from '@/components/Period.vue';
import SelectedList from '@/components/SelectedList.vue';
import type { Account } from '@/models';
import { useAccountStore, useOpetationStore, useBalanceStore } from '@/stores';

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
            secondAccount: undefined as Account | undefined
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
            return accountStore.accountList
        },
        activeAccounts() {
            return accountStore.activeAccounts.filter(i => i.isAssetAccount)
        },
        passiveAccounts() {
            return accountStore.activeAccounts.filter(i => !i.isAssetAccount)
        },
    },
    methods: {
        setSecondAccount(accountId: number) {
            this.secondAccount = accountStore.getAccount( accountId )
        },
        addOperation() {
            if (this.secondAccount) {
                if ( this.debit > 0 ) {
                    opetationStore.addOperation(this.name, this.debit, this.secondAccount, this.acount)
                } else if ( this.credit > 0 ) {
                    opetationStore.addOperation(this.name, this.credit, this.acount, this.secondAccount)
                }
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

.accountList > ul {
    list-style: none;
    padding-left: 0;
}
</style>
