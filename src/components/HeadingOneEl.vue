<template>
  <h1 :class="cls">
    <slot></slot>
  </h1>
</template>

<script setup lang="ts">
defineProps(['cls'])
</script>
