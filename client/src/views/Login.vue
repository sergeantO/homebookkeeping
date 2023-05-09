<template>
    <div>
        <input type="email" placeholder="email" v-model="email">
        <input type="password" name="" id="" placeholder="password" v-model="password">
        <button @click="test()">Enter</button>
        <RouterLink to="/register">Register</RouterLink>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from "axios"
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
