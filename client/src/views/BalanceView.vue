<template>
    <q-page class="q-pa-lg">
        <div class="row q-mb-md">
            <div class="col-12">
                <h3 class="q-mt-none">Баланс</h3>
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
            <div class="col-lg-6 col-12 q-pb-md q-pr-md">
                
                    <q-markup-table>
                        <thead class="bg-primary">
                            <th colspan="2">Актив</th>
                            <th>вход</th>
                            <th>Дебет</th>
                            <th>кредит</th>
                            <th>итог</th>
                            <th>выход</th>
                        </thead>
                        <tbody>
                            <tr class="bg-primary">
                                <td colspan="2" class="bg-sky">Внеоборотные активы</td>
                                <td class="bg-sky">{{ totalFixedAssets.startValue }}</td>
                                <td class="bg-sky">{{ totalFixedAssets.debit }}</td>
                                <td class="bg-sky">{{ totalFixedAssets.credit }}</td>
                                <td class="bg-sky">{{ totalFixedAssets.result }}</td>
                                <td class="bg-sky">{{ totalFixedAssets.endValue }}</td>
                            </tr>
                            <tr v-for="balance of fixedAssets" :key="balance.account.id">
                                <td colspan="2">
                                    <RouterLink :to="{ name: 'account', params: { id: balance.account.id } }">{{
                                        balance.account.name
                                    }}</RouterLink>
                                </td>
                                <td class="num">{{ balance.startVal }}</td>
                                <td class="num">{{ balance.debit }}</td>
                                <td class="num">{{ balance.credit }}</td>
                                <td class="num">{{ balance.result }}
                                    <button v-if="balance.result > 0"
                                        @click="toLose(balance.account, balance.result)">-></button>
                                </td>
                                <td class="num">{{ balance.endVal }}</td>
                            </tr>

                            <tr class="bg-primary">
                                <td colspan="2" class="bg-sky">Оборотные активы</td>
                                <td class="bg-sky">{{ totalCurrentAssets.startValue }}</td>
                                <td class="bg-sky">{{ totalCurrentAssets.debit }}</td>
                                <td class="bg-sky">{{ totalCurrentAssets.credit }}</td>
                                <td class="bg-sky">{{ totalCurrentAssets.result }}</td>
                                <td class="bg-sky">{{ totalCurrentAssets.endValue }}</td>
                            </tr>

                            <tr v-for="balance of currentAssets">
                                <td colspan="2">
                                    <RouterLink :to="{ name: 'account', params: { id: balance.account.id } }">{{
                                        balance.account.name
                                    }}</RouterLink>
                                </td>
                                <td class="num">{{ balance.startVal }}</td>
                                <td class="num">{{ balance.debit }}</td>
                                <td class="num">{{ balance.credit }}</td>
                                <td class="num">{{ balance.result }}
                                    <button v-if="balance.result > 0"
                                        @click="toLose(balance.account, balance.result)">-></button>
                                </td>
                                <td class="num">{{ balance.result + balance.startVal }}</td>
                            </tr>
                            <tr class="bg-primary">
                                <td colspan="2" class="bg-sky">Итог по активам</td>
                                <td class="bg-sky">{{ totalCurrentAssets.startValue + totalFixedAssets.startValue }}</td>
                                <td class="bg-sky">{{ totalCurrentAssets.debit + totalFixedAssets.debit }}</td>
                                <td class="bg-sky">{{ totalCurrentAssets.credit + totalFixedAssets.credit }}</td>
                                <td class="bg-sky">{{ totalCurrentAssets.result + totalFixedAssets.result }}</td>
                                <td class="bg-sky">{{ totalCurrentAssets.endValue + totalFixedAssets.endValue }}</td>
                            </tr>
                        </tbody>

                    </q-markup-table>
                
            </div>

            <div class="col-lg-6 col-12 q-pr-md">
                
                    <q-markup-table>
                        <thead class="bg-primary">
                            <th colspan="2">Пасив</th>
                            <th>вход</th>
                            <th>Дебет</th>
                            <th>кредит</th>
                            <th>итог</th>
                            <th>выход</th>
                        </thead>
                        <tbody>
                            <tr class="bg-primary">
                                <td colspan="2" class="bg-sky">Собственный капитал</td>
                                <td class="bg-sky">{{ totalOwnCapitalAssets.startValue }}</td>
                                <td class="bg-sky">{{ totalOwnCapitalAssets.debit }}</td>
                                <td class="bg-sky">{{ totalOwnCapitalAssets.credit }}</td>
                                <td class="bg-sky">{{ totalOwnCapitalAssets.result }}</td>
                                <td class="bg-sky">{{ totalOwnCapitalAssets.endValue }}</td>
                            </tr>
                            <tr v-for="balance of ownCapitalAssets">
                                <td colspan="2">
                                    <RouterLink :to="{ name: 'account', params: { id: balance.account.id } }">{{
                                        balance.account.name
                                    }}</RouterLink>
                                </td>
                                <td class="num">{{ balance.startVal }}</td>
                                <td class="num">{{ balance.debit }}</td>
                                <td class="num">{{ balance.credit }}</td>
                                <td class="num">{{ balance.result }}</td>
                                <td class="num">{{ balance.result + balance.startVal }}</td>
                            </tr>

                            <tr class="bg-primary">
                                <td colspan="2" class="bg-sky">Долги</td>
                                <td class="bg-sky">{{ totalDebits.startValue }}</td>
                                <td class="bg-sky">{{ totalDebits.debit }}</td>
                                <td class="bg-sky">{{ totalDebits.credit }}</td>
                                <td class="bg-sky">{{ totalDebits.result }}</td>
                                <td class="bg-sky">{{ totalDebits.endValue }}</td>
                            </tr>
                            <tr v-for="balance of debts">
                                <td colspan="2">
                                    <RouterLink :to="{ name: 'account', params: { id: balance.account.id } }">{{
                                        balance.account.name
                                    }}</RouterLink>
                                </td>
                                <td class="num">{{ balance.startVal }}</td>
                                <td class="num">{{ balance.debit }}</td>
                                <td class="num">{{ balance.credit }}</td>
                                <td class="num">{{ balance.result }}</td>
                                <td class="num">{{ balance.result + balance.startVal }}</td>
                            </tr>
                            <tr class="bg-primary">
                                <td colspan="2" class="bg-sky">
                                    Итоги по пассивам
                                </td>
                                <td class="bg-sky">{{ totalDebits.startValue + totalOwnCapitalAssets.startValue }}</td>
                                <td class="bg-sky">{{ totalDebits.debit + totalOwnCapitalAssets.debit }}</td>
                                <td class="bg-sky">{{ totalDebits.credit + totalOwnCapitalAssets.credit }}</td>
                                <td class="bg-sky">{{ totalDebits.result + totalOwnCapitalAssets.result }}</td>
                                <td class="bg-sky">{{ totalDebits.endValue + totalOwnCapitalAssets.endValue }}</td>
                            </tr>
                        </tbody>

                    </q-markup-table>
                
            </div>

        </div>
    </q-page>
</template>

<script lang="ts">
import Period from '@/components/Period.vue';
import CreateAccount from '@/components/CreateAccount.vue';
import ActiveOnlyCheckbox from '@/components/ActiveOnlyCheckbox.vue'
import { Account, AccountTypeEnum } from '@/models';
import { defineComponent } from 'vue';
import { useAccountStore, useBalanceStore } from '@/stores';
import type { IBalanceResult } from '@/stores/balanceStore';

const accountStore = useAccountStore()
const balanceStore = useBalanceStore()

export default defineComponent({
    components: {
        Period: Period,
        ActiveOnlyCheckbox: ActiveOnlyCheckbox,
        CreateAccount
    },
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
                accountStore.addAccount(newAccountType, newAccountName)
            }
        },
        toLose(account: Account, sum: number) {
            balanceStore.toLose(account, sum)
        },
        total(balances: IBalanceResult[]) {
            return balances.reduce((acc, i) => {
                acc.credit += i.credit
                acc.debit += i.debit
                acc.result += i.result
                acc.startValue += i.startVal
                acc.endValue += i.endVal

                return acc
            }, { result: 0, startValue: 0, debit: 0, credit: 0, endValue: 0 })
        }
    },
    computed: {
        activeBalance(): IBalanceResult[] {
            return balanceStore.process
        },
        debts() {
            return balanceStore.process
                .filter((i: IBalanceResult) => i.account.type === AccountTypeEnum.DEBT)
        },
        fixedAssets() {
            return  balanceStore.process
                .filter((i: IBalanceResult) => i.account.type === AccountTypeEnum.FIXED_ASSET)
        },
        ownCapitalAssets() {
            return  balanceStore.process
                .filter((i: IBalanceResult) => i.account.type === AccountTypeEnum.OWN_CAPITAL)
        },
        currentAssets() {
            return  balanceStore.process
                .filter((i: IBalanceResult) => i.account.type === AccountTypeEnum.CURRENT_ASSET)
        },
        totalDebits() {
            //@ts-ignore компилятор не видит this.debts -_-
            return this.total(this.debts)
        },
        totalFixedAssets() {
            //@ts-ignore компилятор не видит this.debts -_-
            return this.total(this.fixedAssets)
        },
        totalOwnCapitalAssets() {
            //@ts-ignore компилятор не видит this.debts -_-
            return this.total(this.ownCapitalAssets)
        },
        totalCurrentAssets() {
            //@ts-ignore компилятор не видит this.debts -_-
            return this.total(this.currentAssets)
        }
    },

})
</script>

<style></style>