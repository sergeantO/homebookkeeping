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

            <q-scroll-area style="height: calc(100vh - 200px);">
                <q-list class="q-mt-md">
                <q-item clickable @click="openDateRangeDialog()" active-class="q-item-no-link-highlighting">
                    <q-item-section avatar>
                        <q-icon name="calendar_month" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{ dateRange?.from }}  ...  {{ dateRange?.to }}</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item to="/balance" active-class="q-item-no-link-highlighting">
                    <q-item-section avatar>
                        <q-icon name="account_balance" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>/Баланс</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item to="/operations" active-class="q-item-no-link-highlighting">
                    <q-item-section avatar>
                        <q-icon name="receipt_long" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>/Операции</q-item-label>
                    </q-item-section>
                </q-item>

                <q-expansion-item icon="account_balance_wallet" dark label="/Счета">
                    <q-list class="q-pl-lg">
                            <q-item v-for="account in accounts" :to="{name: 'account', params: { id: account.id }}" active-class="q-item-no-link-highlighting">
                                <q-item-section class="q-pl-lg">
                                    /{{account.name}}
                                </q-item-section>
                            </q-item>
                    </q-list>
                </q-expansion-item>
                
            </q-list>
            </q-scroll-area>
           
           
            
            <div class="absolute-bottom bg-primary">
                <q-separator color="white" />
                <div v-if="!miniState" class="row q-pa-lg">
                    <div class="col-8">
                        <div class="text-weight-bold">{{ user.name }}</div>
                        <div> {{ user.email  }}</div>
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

    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="q-dialog-plugin">
            <q-card-section>
                <div class="text-h6">Создать новый счет</div>
            </q-card-section>

            <q-card-section class="row justify-center">
                <q-date flat today-btn v-model="dateRange" range mask="DD.MM.YYYY" />
            </q-card-section>

            <!-- buttons example -->
            <q-card-actions align="right">
                <q-btn color="primary" label="OK" @click="onOKClick" />
                <q-btn color="primary" label="Cancel" @click="onCancelClick" />
            </q-card-actions>
        </q-card>
    </q-dialog>

</template>

<script lang="ts">
import { userInfo } from '@/services/userInfo'
import { useAccountStore, useOpetationStore, usePeriodStore } from '@/stores'
import { useUserStore } from '@/stores/userStore'
import { useQuasar, useDialogPluginComponent } from 'quasar'
import { defineComponent, ref } from 'vue'

const miniState = ref(false)
const $q = useQuasar()


const periodStore = usePeriodStore()
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

    data() {
        return {
            user: userInfo.getUser(),
            dateRange: periodStore.dateRange,
        }
    },

    watch: {
        dateRange(newVal) {
            if (!newVal) return
            periodStore.dateRange = newVal
            periodStore.save()
            opetationStore.getOperations()
        }
    },

    setup() {
        // REQUIRED; must be called inside of setup()
        const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

        return {
            $q,
            miniState,
            toggleLeftDrawer() {
                miniState.value = !miniState.value
            },
            dialogRef,
            onDialogHide,

            // other methods that we used in our vue html template;
            // these are part of our example (so not required)
            onOKClick () {
                // on OK, it is REQUIRED to
                // call onDialogOK (with optional payload)
                onDialogOK()
                // or with payload: onDialogOK({ ... })
                // ...and it will also hide the dialog automatically
            },

            // we can passthrough onDialogCancel directly
            onCancelClick: onDialogCancel
        }
    },

    emits: [
        // REQUIRED; need to specify some events that your
        // component will emit through useDialogPluginComponent()
        ...useDialogPluginComponent.emits
    ],

    computed: {
        accounts() {
            return accountStore.activeAccounts
        },
    },

    methods: {
        logout() {
            userStore.logout().then(() => {
                opetationStore.clear()
                accountStore.clear()
                this.$router.push('/login')
            })
        },
        openDateRangeDialog() {
            (this.$refs as any).dialogRef.show()
        },
    }
})
</script>

<style lang="scss">
.vertical-scroll {
    overflow-x: hidden !important;
    overflow-y: auto !important;
}
</style>