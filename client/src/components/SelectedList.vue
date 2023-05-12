<template>
    <select class="form-control w-100" @change="onSelect">
        <option disabled selected value="0">Выберите</option>
        <option 
            v-for="option in options" 
            v-bind:value="option.id" 
            :selected="option.id === select"
        >
            {{ option.name }}
        </option>
    </select>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface IOption {
    id: number,
    name: string
}

export default defineComponent ({
    props: {
        options: {
            required: true,
            default: [] as IOption[]
        },
        select: {
            required: true,
            default: 0
        }
    },
    methods: {
        onSelect(event: any) {
            const val = +event.target?.value || 0
            this.$emit('select', val)
        }
    }
})
</script>
