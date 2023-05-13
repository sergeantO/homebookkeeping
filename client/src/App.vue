<template>
  <RouterView />  
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style lang="scss" scoped>
.example-row-equal-width {
  .row > div {
    padding: 10px 15px;
    background: rgba(#999,.15);
    border: 1px solid rgba(#999,.2);
  }
    
  .row + .row {
    margin-top: 1rem;
  }
    
}
  
</style>

