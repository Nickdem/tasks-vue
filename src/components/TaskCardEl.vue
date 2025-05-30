<template>
  <v-card class="mx-auto task-cart mb-3">
    <v-card-title class="text-uppercase">{{ task.task_title }}</v-card-title>
    <v-card-subtitle class="text-caption">{{ task.task_body }}</v-card-subtitle>
    <v-card-actions class="px-4">
      <router-link :to="`/tasks/${task.id}`"><v-btn variant="tonal"> перейти </v-btn></router-link>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
defineProps(['task'])
</script>
