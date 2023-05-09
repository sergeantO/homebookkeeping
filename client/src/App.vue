<template>
  <header>
      <div class="logo">
        <h1>Микробугалтерия</h1>
      </div>
      
      <nav>
        <ul class="menu">
          <li class="menu-item">
              <RouterLink to="/balance">Баланс</RouterLink>
          </li>
          <li class="menu-item">
            <RouterLink to="/account/1">Счета</RouterLink>
          </li>
          <li class="menu-item">
            <RouterLink to="/operations">Операции</RouterLink>
          </li>
        </ul>
      </nav>
  </header>

  <main id="content">
    <RouterView />
  </main> 
  
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAccountStore, useOpetationStore } from './stores';

const accountStore = useAccountStore()
const opetationStore = useOpetationStore()

accountStore.getAccounts().then(() => {
  opetationStore.getOperations()
})

</script>

<style scoped>


</style>

