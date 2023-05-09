<template>
    <div class="login-form">
        <div class="row my-2">
            <div class="col">
                <input type="email" placeholder="email" v-model="email">
            </div>
        </div>
        <div class="row my-2">
            <div class="col">
                <input type="password" name="" id="" placeholder="password" v-model="password">
            </div>
        </div>
        <div class="row my-2">
            <div class="col">
                <button @click="test()">Войти</button>
            </div>
            <div class="col">
                Нет аккаунта? <RouterLink to="/register">Зарегистрироваться</RouterLink>
            </div>
        </div>
    </div>
    
       
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()

export default defineComponent({
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        test() {
            const email = this.email
            const password = this.password
            userStore.login(email, password).then(() => { 
                this.$router.replace('balance')
            })
        }
    },
})
</script>

<style scoped>
.login-form {
    margin: 20vh auto;
    max-width: 500px;
}

</style>
