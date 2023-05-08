<template>
    <div class="row my-2">
        <div class="col">
            <h1>Баланс</h1>
            <ActiveOnlyCheckbox />
        </div>
        <div class="col">
            <Period />
        </div>
        <div class="col">
            <input type="text" v-model="newAccountName">
        </div>
    </div>

    <div class="row">
        <div class="col">
            <table>
                <thead>
                    <th colspan="3">Актив</th>
                    <th>на начало</th>
                    <th>оборот</th>
                    <th>на конец</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="3" class="bg-sky">
                            Внеоборотные активы
                            <button class="add-button" @mouseup="addFixedAssetAccount">+</button>
                        </td>
                        <td class="bg-sky">{{ totalFixedAssets.startValue }}</td>
                        <td class="bg-sky">{{ totalFixedAssets.turnover }}</td>
                        <td class="bg-sky">{{ totalFixedAssets.result }}</td>
                        <td class="bg-sky"></td>
                    </tr>
                    <tr v-for="balance of fixedAssets" :key="balance.account.id">
                        <td colspan="3">
                            <RouterLink :to="{ name: 'account', params: { id: balance.account.id }}">{{ balance.account.name }}</RouterLink>
                        </td>
                        <td class="num">{{ balance.startVal }}</td>
                        <td class="num">{{ balance.turnover }}</td>
                        <td class="num">{{ balance.result }}</td>
                        <td><button v-if="balance.result > 0" @click="toLose(balance.account, balance.result)">-></button> </td>
                    </tr>

                    <tr>
                        <td colspan="3" class="bg-sky">
                            Оборотные активы
                            <button class="add-button" @mouseup="addCurrentAssetsAccount">+</button>
                        </td>
                        <td class="bg-sky">{{ totalCurrentAssets.startValue }}</td>
                        <td class="bg-sky">{{ totalCurrentAssets.turnover }}</td>
                        <td class="bg-sky">{{ totalCurrentAssets.result }}</td>
                        <td class="bg-sky"></td>
                    </tr>
                    <tr v-for="balance of currentAssets">
                        <td colspan="3">
                            <RouterLink :to="{ name: 'account', params: { id: balance.account.id }}">{{ balance.account.name }}</RouterLink>
                        </td>
                        <td class="num">{{ balance.startVal }}</td>
                        <td class="num">{{ balance.turnover }}</td>
                        <td class="num">{{ balance.result }}</td>
                        <td><button v-if="balance.result > 0" @click="toLose(balance.account, balance.result)">-></button> </td>
                    </tr>
                    <tr>
                        <td colspan="3" class="bg-sky">
                            Итог по активам
                        </td>
                        <td class="bg-sky">{{ totalCurrentAssets.startValue + totalFixedAssets.startValue }}</td>
                        <td class="bg-sky">{{ totalCurrentAssets.turnover + totalFixedAssets.turnover }}</td>
                        <td class="bg-sky">{{ totalCurrentAssets.result + totalFixedAssets.result }}</td>
                        <td class="bg-sky"></td>
                    </tr>
                </tbody>

            </table>
        </div>

        <div class="col">
            <table>
                <thead>
                    <th colspan="3">Пассив</th>
                    <th>на начало</th>
                    <th>оборот</th>
                    <th>на конец</th>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="3" class="bg-sky">
                            Собственный капитал
                            <button class="add-button" @mouseup="addOwnCapitalAccount">+</button>
                        </td>
                        <td class="bg-sky">{{ totalOwnCapitalAssets.startValue }}</td>
                        <td class="bg-sky">{{ totalOwnCapitalAssets.turnover }}</td>
                        <td class="bg-sky">{{ totalOwnCapitalAssets.result }}</td>
                    </tr>
                    <tr v-for="balance of ownCapitalAssets">
                        <td colspan="3">
                            <RouterLink :to="{ name: 'account', params: { id: balance.account.id }}">{{ balance.account.name }}</RouterLink>
                        </td>
                        <td class="num">{{ balance.startVal }}</td>
                        <td class="num">{{ balance.turnover }}</td>
                        <td class="num">{{ balance.result }}</td>
                    </tr>

                    <tr>
                        <td colspan="3" class="bg-sky">
                            Долги
                            <button class="add-button" @mouseup="addDebtAccount">+</button>
                        </td>
                        <td class="bg-sky">{{ totalDebits.startValue }}</td>
                        <td class="bg-sky">{{ totalDebits.turnover }}</td>
                        <td class="bg-sky">{{ totalDebits.result }}</td>
                    </tr>
                    <tr v-for="balance of debts">
                        <td colspan="3">
                            <RouterLink :to="{ name: 'account', params: { id: balance.account.id }}">{{ balance.account.name }}</RouterLink>
                        </td>
                        <td class="num">{{ balance.startVal }}</td>
                        <td class="num">{{ balance.turnover }}</td>
                        <td class="num">{{ balance.result }}</td>
                    </tr>
                    <tr>
                        <td colspan="3" class="bg-sky">
                            Итоги по пассивам
                        </td>
                        <td class="bg-sky">{{ totalDebits.startValue + totalOwnCapitalAssets.startValue }}</td>
                        <td class="bg-sky">{{ totalDebits.turnover + totalOwnCapitalAssets.turnover }}</td>
                        <td class="bg-sky">{{ totalDebits.result + totalOwnCapitalAssets.result }}</td>
                    </tr>
                </tbody>

            </table>
        </div>

    </div>
</template>

<script lang="ts">
import { useAccountStore, useBalanceStore, useOpetationStore, type IBalanceResult, usePeriodStore } from '@/stores/counter';
import Period from '@/components/Period.vue';
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
        ActiveOnlyCheckbox: ActiveOnlyCheckbox
    },
    data() {
        return {
            newAccountName: '',
        }
    },
    methods: {
        addCurrentAssetsAccount() {
            if (this.newAccountName.length > 0) {
                accountStore.addAccount(AccountTypeEnum.CurrentAsset, this.newAccountName)
                this.newAccountName = ''
            }
        },
        addDebtAccount() {
            if (this.newAccountName.length > 0) {
                accountStore.addAccount(AccountTypeEnum.Debt, this.newAccountName)
                this.newAccountName = ''
            }
        },
        addFixedAssetAccount() {
            if (this.newAccountName.length > 0) {
                accountStore.addAccount(AccountTypeEnum.FixedAsset, this.newAccountName)
                this.newAccountName = ''
            }
        },
        addOwnCapitalAccount() {
            if (this.newAccountName.length > 0) {
                accountStore.addAccount(AccountTypeEnum.OwnCapital, this.newAccountName)
                this.newAccountName = ''
            }
        },
        toLose(account: Account, sum: number) {
            balanceStore.toLose(account, sum)
        },
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
            return this.debts.reduce((acc, i) => {
                acc['result'] +=  i.result 
                acc['turnover'] += i.turnover
                acc['startValue'] += i.startVal
                return acc
            }, { result: 0, startValue: 0, turnover: 0 })
        },
        totalFixedAssets() {
            return this.fixedAssets.reduce((acc, i) => {
                acc['result'] +=  i.result 
                acc['turnover'] += i.turnover
                acc['startValue'] += i.startVal
                return acc
            }, { result: 0, startValue: 0, turnover: 0 })
        },
        totalOwnCapitalAssets() {
            return this.ownCapitalAssets.reduce((acc, i) => {
                acc['result'] +=  i.result 
                acc['turnover'] += i.turnover
                acc['startValue'] += i.startVal
                return acc
            }, { result: 0, startValue: 0, turnover: 0 })
        },
        totalCurrentAssets() {
            return this.currentAssets.reduce((acc, i) => {
                acc['result'] +=  i.result 
                acc['turnover'] += i.turnover
                acc['startValue'] += i.startVal
                return acc
            }, { result: 0, startValue: 0, turnover: 0 })
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

th, td {
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
}
</style>