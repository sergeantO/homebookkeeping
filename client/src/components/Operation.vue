<template>
    <tr :class="{ selected: operId === operation.id }">
        <td>{{ operation.id }}</td>
        <td>{{ operation.name }}</td>
        <td>
            <RouterLink :to="{ name: 'account', params: { id: operation.debitAccount.id }}">{{ operation.debitAccount.name }}</RouterLink>
        </td>
        <td>
           
        </td>
        <td>
            <RouterLink :to="{ name: 'account', params: { id: operation.creditAccount.id }}">{{ operation.creditAccount.name }}</RouterLink>
        </td>
        <td>{{ operation.val }}</td>
        <td>{{ dateFormat }}</td>
    </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        operation: {
            required: true, 
            type: Object
        }
    },
    computed: {
        operId() {
            const id = +this.$route.params.id
            return id
        },
        dateFormat() {
            const date = this.operation.createdAt as Date
            return date?.toLocaleDateString() || ''
        }
    }
})
</script>

<style>
.selected {
    background-color: rgba(137, 207, 235, .5);
}
</style>