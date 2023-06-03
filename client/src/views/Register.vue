<template>
    <q-layout class="register-page">
        <q-page-container>
            <q-page class="flex bg-image flex-center">
                <q-card :style="$q.screen.lt.md ? { 'width': '75%' } : { 'width': '50%' }">
                    <q-card-section>
                        <div class="text-center q-pt-lg">
                            <div class="col text-h6 ellipsis">
                                Регистрация
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-form class="q-gutter-md">
                            <q-input type="text" filled v-model="name" label="Введите имя" lazy-rules />
                            <q-input type="email" filled v-model="email" label="Введите e-mail" lazy-rules />
                            <q-input type="password" filled v-model="password" label="Введите пароль" lazy-rules />
                            <q-input type="password" filled v-model="passwordConfirm" label="Повторите пароль" lazy-rules />
                            <div>
                                <q-btn label="Зарегистрироваться" type="button" color="primary" @click="registerHandler()" />
                            </div>
                        </q-form>
                    </q-card-section>
                </q-card>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { notify } from '@/services/Notify';

const userStore = useUserStore()

export default defineComponent({
    data() {
        return {
            email: '',
            password: '',
            passwordConfirm: '',
            name: '',
        }
    },
    methods: {
        registerHandler() {
            const email = this.email
            const password = this.password
            const name = this.name
            if(this.passwordConfirm === password) {
                userStore.register(email, password, name)
                    .then(() => {
                        this.$router.replace('balance')
                    })
                    .catch(({ response }) => {
                        if (response?.data?.message) {
                            notify.error(response.data.message)
                        }
                    })
            } else {
                notify.error('пароль не пароль')
            }
            
        }
    }
})
</script>

<style scoped lang="scss">
.register-page {
    background: linear-gradient(to right top, #00bd7e, #39C5D9);
}
</style>
