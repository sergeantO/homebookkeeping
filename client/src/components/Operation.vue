<template>
    <tr :class="{ 'bg-accent text-primary': operId === operation.id }">
        <td>{{ operation.id }}</td>
        <td>{{ operation.name }}</td>
        <td>
            <span v-if="operation.debitAccount?.id">
                <RouterLink :to="{ name: 'account', params: { id: operation.debitAccount.id || 0 }}">{{ operation.debitAccount.name }}</RouterLink>
            </span>
           <span v-else>[forein bill]</span>
        </td>
        <td>
            <span v-if="operation.creditAccount?.id">
                <RouterLink :to="{ name: 'account', params: { id: operation.creditAccount.id || 0 }}">{{ operation.creditAccount.name }}</RouterLink>
            </span>
            <span v-else>[forein bill]</span>
        </td>
        <td>{{ operation.val }}</td>
        <td>{{ dateFormat }}</td>
        <td><q-btn v-if=" operation.isEditable" outline icon="delete" color="primary" size="sm" @click="remove(operation.id)"></q-btn></td>
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
    },
    methods: {
        remove(id: number){
            this.$emit('remove', id)
        }
    }
})
</script>

<style>
.selected {
    background-color: rgba(137, 207, 235, .5);
}
</style>