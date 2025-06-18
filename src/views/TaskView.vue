<script setup lang="ts">
import HeadingOneEl from '@/components/HeadingOneEl.vue'
import LoaderEl from '@/components/LoaderEl.vue'
import { useTaskStore } from '@/stores/task'
import { onMounted } from 'vue'

import { useRoute } from 'vue-router'
const route = useRoute()
const tasksStore = useTaskStore()
onMounted(() => {
  tasksStore.getFromApiTask(+route.params.id)
})
</script>

<template>
  <LoaderEl v-if="tasksStore.currentTaskLoading" />
  <template v-else>
    <HeadingOneEl :cls="'text-h4 pb-6'"
      >Задача: {{ tasksStore.getTaskInfo?.task_title }}</HeadingOneEl
    >

    <!-- {{ tasksStore.getTaskInfo?.task_title }} -->
    {{ !!tasksStore.getTaskInfo?.task_fire }}{{ tasksStore.getTaskInfo?.task_fire }}
    <pre>

    {{ tasksStore.getTaskInfo }}</pre
    >
    <v-card variant="tonal" :title="'Название: ' + tasksStore.getTaskInfo?.task_title">
      <v-card-text> Описание: {{ tasksStore.getTaskInfo?.task_body }} </v-card-text>
      <v-card-text> Дата назначения: {{ tasksStore.getTaskInfo?.task_created_time }} </v-card-text>
      <v-card-text> Дата деадлайна: {{ tasksStore.getTaskInfo?.task_deadline }} </v-card-text>
      <v-card-text> Назначил: {{ tasksStore.getTaskInfo?.task_created_by }} </v-card-text>
      <v-card-text> Исполнитель: {{ tasksStore.getTaskInfo?.task_to_work }} </v-card-text>
      <v-card-text v-if="!!tasksStore.getTaskFire"> Срочная задача </v-card-text>
      <v-card-actions>
        <v-btn @click="tasksStore.deleteFromApiTask(+route.params.id)"
          >Удалить</v-btn
        ></v-card-actions
      >
    </v-card>
  </template>
</template>
