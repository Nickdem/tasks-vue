<template>
  <v-card class="mx-auto task-cart mb-3">
    <v-card-title class="text-uppercase">{{ task.task_title }}</v-card-title>
    <v-card-subtitle class="text-caption">{{ task.task_body }}</v-card-subtitle>
    <v-row class="mx-0 my-0" align="center">
      <v-col class="px-0 me-auto pl-4" cols="auto">
        <router-link :to="`/tasks/${task.id}`">
          <v-btn variant="tonal"> перейти </v-btn>
        </router-link>
      </v-col>
      <!-- <v-spacer></v-spacer> -->
      <v-col class="px-0 mr-4" align-self="end" cols="auto">
        <v-chip>{{ task.task_status }}</v-chip>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
defineProps(['task'])
</script>
