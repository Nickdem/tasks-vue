<script setup lang="ts">
import HeaderBlock from '@/components/HeaderBlock.vue'
import FooterBlock from '@/components/FooterBlock.vue'
</script>

<template>
  <HeaderBlock />
  <slot></slot>
  <FooterBlock />
</template>
