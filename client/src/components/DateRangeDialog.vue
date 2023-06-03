<template>
    <q-dialog ref="dateRangeDialog">
        <q-card class="q-dialog-plugin">
            <q-card-section>
                <div class="text-h6">Создать новый счет</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-date v-model="model" range />
            </q-card-section>

            <!-- buttons example -->
            <q-card-actions align="right">
            </q-card-actions>
        </q-card>
    </q-dialog>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  
  
  export default defineComponent({
    data() {
        return {
            model: { 
                from: '2020/07/08',
                to: '2020/07/17',
            },
        }
    }
  })
  </script>