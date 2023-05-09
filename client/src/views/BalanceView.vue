<template>
    <CreateAccount />
    <div class="row my-2">
        <div class="col">
            <h1>Баланс</h1>
            <ActiveOnlyCheckbox />
        </div>
        <div class="col">
            <Period />
        </div>
    </div>

    <div class="row  my-2">
        <div class="col">
            <table>
                <thead>
                    <th colspan="2">Актив</th>
                    <th>вход</th>
                    <th>дебит</th>
                    <th>кредит</th>
                    <th>итог</th>
                    <th>выход</th>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="2" class="bg-sky">Внеоборотные активы</td>
                        <td class="bg-sky">{{ totalFixedAssets.startValue }}</td>
                        <td class="bg-sky">{{ totalFixedAssets.debit }}</td>
                        <td class="bg-sky">{{ totalFixedAssets.credit }}</td>
                        <td class="bg-sky">{{ totalFixedAssets.result }}</td>
                        <td class="bg-sky">{{ totalFixedAssets.endValue }}</td>
                    </tr>
                    <tr v-for="balance of fixedAssets" :key="balance.account.id">
                        <td colspan="2">
                            <RouterLink :to="{ name: 'account', params: { id: balance.account.id } }">{{ balance.account.name
                            }}</RouterLink>
                        </td>
                        <td class="num">{{ balance.startVal }}</td>
                        <td class="num">{{ balance.debit }}</td>
                        <td class="num">{{ balance.credit }}</td>
                        <td class="num">{{ balance.result }} 
                            <button v-if="balance.result > 0" @click="toLose(balance.account, balance.result)">-></button>
                        </td>
                        <td class="num">{{ balance.endVal }}</td>
                    </tr>

                    <tr>
                        <td colspan="2" class="bg-sky">Оборотные активы</td>
                        <td class="bg-sky">{{ totalCurrentAssets.startValue }}</td>
                        <td class="bg-sky">{{ totalCurrentAssets.debit }}</td>
                        <td class="bg-sky">{{ totalCurrentAssets.credit }}</td>
                        <td class="bg-sky">{{ totalCurrentAssets.result }}</td>
                        <td class="bg-sky">{{ totalCurrentAssets.endValue }}</td>
                    </tr>

                    <tr v-for="balance of currentAssets">
                        <td colspan="2">
                            <RouterLink :to="{ name: 'account', params: { id: balance.account.id } }">{{ balance.account.name
                            }}</RouterLink>
                        </td>
                        <td class="num">{{ balance.startVal }}</td>
                        <td class="num">{{ balance.debit }}</td>
                        <td class="num">{{ balance.credit }}</td>
                        <td class="num">{{ balance.result }}
                            <button v-if="balance.result > 0" @click="toLose(balance.account, balance.result)">-></button>
                        </td>
                        <td class="num">{{ balance.result + balance.startVal }}</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="bg-sky">Итог по активам</td>
                        <td class="bg-sky">{{ totalCurrentAssets.startValue + totalFixedAssets.startValue }}</td>
                        <td class="bg-sky">{{ totalCurrentAssets.debit + totalFixedAssets.debit }}</td>
                        <td class="bg-sky">{{ totalCurrentAssets.credit + totalFixedAssets.credit }}</td>
                        <td class="bg-sky">{{ totalCurrentAssets.result + totalFixedAssets.result }}</td>
                        <td class="bg-sky">{{ totalCurrentAssets.endValue +  totalFixedAssets.endValue }}</td>
                    </tr>
                </tbody>

            </table>
        </div>

    </div>
    <div class="row my-2">
        <div class="col">
            <table>
                <thead>
                    <th colspan="2">Пасив</th>
                    <th>вход</th>
                    <th>дебит</th>
                    <th>кредит</th>
                    <th>итог</th>
                    <th>выход</th>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="2" class="bg-sky">Собственный капитал</td>
                        <td class="bg-sky">{{ totalOwnCapitalAssets.startValue }}</td>
                        <td class="bg-sky">{{ totalOwnCapitalAssets.debit }}</td>
                        <td class="bg-sky">{{ totalOwnCapitalAssets.credit }}</td>
                        <td class="bg-sky">{{ totalOwnCapitalAssets.result }}</td>
                        <td class="bg-sky">{{ totalOwnCapitalAssets.endValue }}</td>
                    </tr>
                    <tr v-for="balance of ownCapitalAssets">
                        <td colspan="2">
                            <RouterLink :to="{ name: 'account', params: { id: balance.account.id } }">{{ balance.account.name
                            }}</RouterLink>
                        </td>
                        <td class="num">{{ balance.startVal }}</td>
                        <td class="num">{{ balance.debit }}</td>
                        <td class="num">{{ balance.credit }}</td>
                        <td class="num">{{ balance.result }}</td>
                        <td class="num">{{ balance.result + balance.startVal }}</td>
                    </tr>
                
                    <tr>
                        <td colspan="2" class="bg-sky">Долги</td>
                        <td class="bg-sky">{{ totalDebits.startValue }}</td>
                        <td class="bg-sky">{{ totalDebits.debit }}</td>
                        <td class="bg-sky">{{ totalDebits.credit }}</td>
                        <td class="bg-sky">{{ totalDebits.result }}</td>
                        <td class="bg-sky">{{ totalDebits.endValue }}</td>
                    </tr>
                    <tr v-for="balance of debts">
                        <td colspan="2">
                            <RouterLink :to="{ name: 'account', params: { id: balance.account.id } }">{{ balance.account.name
                            }}</RouterLink>
                        </td>
                        <td class="num">{{ balance.startVal }}</td>
                        <td class="num">{{ balance.debit }}</td>
                        <td class="num">{{ balance.credit }}</td>
                        <td class="num">{{ balance.result }}</td>
                        <td class="num">{{ balance.result + balance.startVal }}</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="bg-sky">
                            Итоги по пассивам
                        </td>
                        <td class="bg-sky">{{ totalDebits.startValue + totalOwnCapitalAssets.startValue }}</td>
                        <td class="bg-sky">{{ totalDebits.debit + totalOwnCapitalAssets.debit }}</td>
                        <td class="bg-sky">{{ totalDebits.credit + totalOwnCapitalAssets.credit }}</td>
                        <td class="bg-sky">{{ totalDebits.result + totalOwnCapitalAssets.result }}</td>
                        <td class="bg-sky">{{ totalDebits.endValue +  totalOwnCapitalAssets.endValue }}</td>
                    </tr>
                </tbody>

            </table>
        </div>

    </div>
</template>

<script lang="ts">
import { useAccountStore, useBalanceStore, useOpetationStore, type IBalanceResult, usePeriodStore } from '@/stores/counter';
import Period from '@/components/Period.vue';
import CreateAccount from '@/components/CreateAccount.vue';
import ActiveOnlyCheckbox from '@/components/ActiveOnlyCheckbox.vue'
import { Account, AccountTypeEnum } from '@/models';
import { defineComponent } from 'vue';

const accountStore = useAccountStore()
const opetationStore = useOpetationStore()
const balanceStore = useBalanceStore()
const periodStore = usePeriodStore()

const profit = accountStore.profit
const card = accountStore.card
const family = accountStore.family
const cash = accountStore.cash
const vklad = accountStore.vklad
const misha = accountStore.misha
const robot = accountStore.robot
const havka = accountStore.havka

accountStore.addAccount(AccountTypeEnum.CurrentAsset, 'Лекарства')
accountStore.addAccount(AccountTypeEnum.CurrentAsset, 'Сигареты')
accountStore.addAccount(AccountTypeEnum.CurrentAsset, 'Крупные покупки')
accountStore.addAccount(AccountTypeEnum.CurrentAsset, 'Салоны')
accountStore.addAccount(AccountTypeEnum.CurrentAsset, 'Животне')
accountStore.addAccount(AccountTypeEnum.CurrentAsset, 'Другие траты')

opetationStore.addOperation('Пришла зп', 50000, profit, card).date = new Date('2023-04-30')
opetationStore.addOperation('Отложил половину', 25000, card, vklad).date = new Date('2023-04-30')

opetationStore.addOperation('Пришла зп', 50000, profit, card)
opetationStore.addOperation('Отложил половину', 7500, card, vklad)
opetationStore.addOperation('Перевел в семейный', 35000, card, family)
opetationStore.addOperation('Миша оплатил тусу', 1650, misha, card)
opetationStore.addOperation('Купили робот-пылесос', 30000, family, robot)
opetationStore.addOperation('Снял дельги с карты 4к', 4000, card, cash)
opetationStore.addOperation('Отдал  Мишк долг наличкой', 1650, cash, misha)
opetationStore.addOperation('Зачислил на счет 2к', 2000, cash, card)
opetationStore.addOperation('Заказали Я.Лавку', 3000, family, havka)

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
            return this.activeBalance
                .filter((i) => i.account.type === AccountTypeEnum.Debt)
        },
        fixedAssets() {
            return this.activeBalance
                .filter(i => i.account.type === AccountTypeEnum.FixedAsset)
        },
        ownCapitalAssets() {
            return this.activeBalance
                .filter(i => i.account.type === AccountTypeEnum.OwnCapital)
        },
        currentAssets() {
            return this.activeBalance
                .filter(i => i.account.type === AccountTypeEnum.CurrentAsset)
        },
        totalDebits() {
            return this.total(this.debts)
        },
        totalFixedAssets() {
            return this.total(this.fixedAssets)
        },
        totalOwnCapitalAssets() {
            return this.total(this.ownCapitalAssets)
        },
        totalCurrentAssets() {
            return this.total(this.currentAssets)
        }
    },

})
</script>

<style>
.row {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.col {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    margin: 0 0.5rem;
}

.my-2 {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

.bg-sky {
    background-color: skyblue;
    font-weight: bold;
}

table {
    width: 100%;
    border-spacing: 0px;
}

th,
td {
    border-bottom: 1px solid black;
    padding: 4px 15px;
    text-align: left;
}

th {
    font-weight: bold;
    text-transform: uppercase;
}

.add-button {
    display: inline-block;
    margin: .5rem;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}</style>