<template>
    <q-btn outline color="primary" @mouseup="show" label="Новый счет" />

    <q-dialog ref="dialog" @hide="onDialogHide">
        <q-card class="q-dialog-plugin">
            <q-card-section>
                <div class="text-h6">Создать новый счет</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-input outlined v-model="newAccountName" label="Название счета" class="q-mb-lg" />
                <q-select outlined v-model="newAccountType" :options="options" label="Тип счета" />
                <q-toggle v-if="newAccountType === 'Оборотные активы'" v-model="isClosable" label="Расходный счет" color="green" />
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
import { useAccountStore } from '@/stores';
import { defineComponent } from 'vue';
import { notify } from '@/services/Notify';

const accountStore = useAccountStore()

export default defineComponent({

    data() {
        return {
            newAccountName: '',
            isClosable: false,
            newAccountType: 'Оборотные активы',
            options: ['Оборотные активы', 'Внеоборотные активы', 'Долги', 'Собственный капитал']
        }
    },
    emits: [
        // REQUIRED
        'ok', 'hide'
    ],

    methods: {
        // following method is REQUIRED
        // (don't change its name --> "show")
        show() {
            (this.$refs as any).dialog.show()
        },

        // following method is REQUIRED
        // (don't change its name --> "hide")
        hide() {
            (this.$refs as any).dialog.hide()
        },

        onDialogHide() {
            // required to be emitted
            // when QDialog emits "hide" event
            this.$emit('hide')
        },

        onOKClick() {
            // on OK, it is REQUIRED to
            // emit "ok" event (with optional payload)
            // before hiding the QDialog
            this.$emit('ok')
            // or with payload: this.$emit('ok', { ... })

            const newAccountType = this.options.findIndex((val) => val === this.newAccountType)
            const newAccountName = this.newAccountName
            const isClosable = this.isClosable
            if (newAccountName.length > 0) {
                this.newAccountName = ''
                accountStore.addAccount(newAccountType, newAccountName, isClosable)
                    .then(() => {
                        notify.success('Счет создан')
                    })
           }

            // then hiding dialog
            this.hide()
        },

        onCancelClick() {
            // we just need to hide the dialog
            this.hide()
        },

    }
})
</script>