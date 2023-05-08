<template>
  <header>
      <nav>
        <RouterLink to="/balance">Баланс</RouterLink>
        <RouterLink to="/account/1">Счета</RouterLink>
        <RouterLink to="/operations">Операции</RouterLink>
      </nav>
  </header>

  <main id="content">
    <RouterView />
  </main>
  
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
header {
  width: 100vw;
  border-bottom: 1px solid #ccc;
  padding-top: .5rem;
  padding-bottom: .5rem;
}

nav {
  width: 100%;
  font-size: 20pt;
  text-align: center;
  display: flex;
  justify-content: space-around;
  text-transform: uppercase;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: .5rem 5rem;
}

nav a:first-of-type {
  border: 0;
}

main#content {
  padding: 1rem 3rem;
}


</style>
