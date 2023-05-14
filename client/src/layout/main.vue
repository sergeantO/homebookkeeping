<template>
    <q-layout view="lHh Lpr lFf">
        <q-drawer :mini="miniState" show-if-above side="left" behavior="desktop" elevated class="bg-primary no-scroll text-white">
            <header class="q-my-md">
                <q-toolbar>
                    <q-btn flat dense round @click="toggleLeftDrawer" icon="menu" aria-label="Menu" />
                    <q-toolbar-title class="logo">
                        Микробухгалтерия
                    </q-toolbar-title>
                </q-toolbar>
            </header> 

            <q-separator color="white" />
           
            <q-list class="q-mt-md">
                <q-item to="/balance" active-class="q-item-no-link-highlighting">
                    <q-item-section avatar>
                        <q-icon name="dashboard" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>/Баланс</q-item-label>
                    </q-item-section>
                </q-item>

                <q-expansion-item icon="pages" label="/Счета">
                    <q-list class="q-pl-lg">
                            <q-item v-for="account in accounts" :to="{name: 'account', params: { id: account.id }}" active-class="q-item-no-link-highlighting">
                            <q-item-section class="q-pl-lg">
                                /{{account.name}}
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-expansion-item>

                <q-item to="/operations" active-class="q-item-no-link-highlighting">
                    <q-item-section avatar>
                        <q-icon name="dashboard" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>/Операции</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
            
            <div class="absolute-bottom bg-transparent">
                <q-separator color="white" />
                <div v-if="!miniState" class="row q-ma-lg">
                    <div class="col-8">
                        <div class="text-weight-bold">Razvan Stoenescu</div>
                        <div>@rstoenescu</div>
                    </div>
                    <div class="col-4">
                        <q-btn outline  color="white" text-color="white" label="logout" @click="logout" />
                    </div>
                </div>
            </div>
        </q-drawer>

        <q-page-container class="bg-grey-2">
            <router-view />
        </q-page-container>

    </q-layout>
</template>

<script lang="ts">
import { useAccountStore, useOpetationStore } from '@/stores'
import { useUserStore } from '@/stores/userStore'
import { useQuasar } from 'quasar'
import { defineComponent, ref } from 'vue'

const miniState = ref(false)
const $q = useQuasar()

const userStore = useUserStore()
const accountStore = useAccountStore()
const opetationStore = useOpetationStore()
accountStore.getAccounts().then(() => {
    opetationStore.getOperations()
})

export default defineComponent({
    name: 'MainLayout',

    components: {
    },

    setup() {
        return {
            $q,
            miniState,
            toggleLeftDrawer() {
                miniState.value = !miniState.value
            }
        }
    },

    computed: {
        accounts() {
            return accountStore.activeAccounts
        }
    },

    methods: {
        logout() {
            userStore.logout()
        }
    }
})
</script>

<style lang="scss" scoped>

</style>