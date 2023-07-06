<template>
    <q-page class="q-pa-lg">
        <div class="row q-mb-lg justify-between items-center">
            <div>
                <h3 class="q-my-none">/Закрытие периода</h3>
            </div>
        </div>

        <div class="row q-col-gutter-md">
            <div class="col-md-4 col-12">
                Остатки с счетов
                <ul>
                    <li v-for="acc in activeAccounts" :key="acc.id"> {{ acc.name }} </li>
                </ul>
            </div>
            <div class="col-md-4 col-12">
                списываются на счет
                <q-select filled bg-color="white" label="кор. счет"  v-model="targetAccount"  :options="ownCapitalAssets" />
            </div>
            <div class="col-md-2 col-12">
                <q-btn color="primary" label="OK" @click="done" />
            </div>
        </div>
    </q-page>
</template>

<script lang="ts">
import { AccountTypeEnum } from '@/models';
import { API_URL } from '@/services/http';
import { useAccountStore } from '@/stores';
import { defineComponent } from 'vue';
import { Api } from "@/services/api"

const accountStore = useAccountStore()

export default defineComponent({
    data() {
        return {
            targetAccount: undefined as any
        }
    },
    computed: {
        activeAccounts() {
            return accountStore.activeAccounts.filter(i => i.isClosable)
        },
        ownCapitalAssets() {
            return accountStore.activeAccounts.filter(i => i.type === AccountTypeEnum.OWN_CAPITAL).map((acc) => ({ label: acc.name, value: acc.id }))
        }
    },
    methods: {
        done() {
            Api.closePeriod(this.targetAccount?.value)
            console.log('ok')
        }
    }
})
</script>