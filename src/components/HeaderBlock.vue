<template>
  <header class="app-header">
    <div class="app-header__left">
      <LogoEl />
    </div>

    <div class="app-header__right">
      <AuthBlock />
    </div>
  </header>
</template>

<script setup lang="ts">
import LogoEl from './LogoEl.vue'
import AuthBlock from './AuthBlock.vue'
</script>
