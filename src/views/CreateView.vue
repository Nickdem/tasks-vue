<script setup lang="ts">
import CreateTaskBlock from '@/components/CreateTaskBlock.vue'
import HeadingOneEl from '@/components/HeadingOneEl.vue'
</script>

<template>
  <HeadingOneEl :cls="'text-h4 pb-6'">Создать задачу</HeadingOneEl>
  <CreateTaskBlock />
</template>
