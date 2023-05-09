<template>
    <tr>
        <td>
            <RouterLink :to="{ name: 'operations', params: { id: operation.id }}">{{ operation.name }}</RouterLink>
        </td>
        <td>
            <RouterLink :to="{ name: 'account', params: { id: corr.id }}">{{ corr.name }}</RouterLink>
        </td>
        <td>{{ debit }}</td>
        <td>{{ credit }}</td>
    </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        operation: {
            required: true, 
            type: Object
        },
        account: {
            required: true,
            type: Object
        }
    },
    computed: {
        corr() {
            return (this.operation.debitAccount.id === this.account.id) 
                ? this.operation.creditAccount 
                : this.operation.debitAccount
        },
        debit() {
            return (this.operation.debitAccount.id === this.account.id) 
                ? this.operation.val
                : ''
        },
        credit() {
            return (this.operation.creditAccount.id === this.account.id) 
                ? this.operation.val
                : ''
        }
    }
})
</script>

