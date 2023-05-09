<template>
    <div>
        <input type="email" placeholder="email" v-model="email">
        <input type="password" name="" id="" placeholder="password" v-model="password">
        <button @click="registerHandler()">Register</button>
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
        registerHandler() {
            const email = this.email
            const password = this.password
            userStore.register(email, password)
        }
    }
})
</script>
