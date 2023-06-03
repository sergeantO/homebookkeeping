<template>
    <q-layout class="login-page">
        <q-page-container>
            <q-page class="flex bg-image flex-center">
                <q-card :style="$q.screen.lt.md ? { 'width': '75%' } : { 'width': '50%' }">
                    <q-card-section>
                        <div class="text-center q-pt-lg">
                            <div class="col text-h6 ellipsis">
                                Войти
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-form class="q-gutter-md">
                            <q-input type="email" filled v-model="email" label="Введите e-mail" lazy-rules />

                            <q-input type="password" filled v-model="password" label="Введите пароль" lazy-rules />

                            <div>
                                <q-btn label="Вход" type="button" color="primary" @click="loginHandler()" />
                            </div>
                            <div>
                                У вас нет аккаунта? <RouterLink to="/register">Регистрация</RouterLink>
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
import { RouterLink } from 'vue-router';
import { notify } from '@/services/Notify';

const userStore = useUserStore()

export default defineComponent({
    data() {
        return {
            email: '',
            password: '',
        }
    },
    components: {
        RouterLink
    },
    methods: {
        loginHandler() {
            const email = this.email
            const password = this.password
            userStore.login(email, password)
                .then(() => {
                    this.$router.replace('balance')
                })
                .catch(({ response }) => {
                    notify.error(response.data.message)
                    this.email = ''
                    this.password = ''
                })
        }
    },
})
</script>

<style scoped lang="scss">
.login-page {
    background: linear-gradient(to right top, #00bd7e, #39C5D9);
}
</style>
