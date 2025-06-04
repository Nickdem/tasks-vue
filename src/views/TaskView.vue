<script setup lang="ts">
import HeadingOneEl from '@/components/HeadingOneEl.vue'
import LoaderEl from '@/components/LoaderEl.vue'
import { useTaskStore } from '@/stores/task'
import { onMounted } from 'vue'
const tasksStore = useTaskStore()
import { useRoute } from 'vue-router'
const route = useRoute()

onMounted(() => {
  tasksStore.getFromApiTask(+route.params.id)
})
</script>

<template>
  <LoaderEl v-if="tasksStore.currentTaskLoading" />
  <template v-else>
    <HeadingOneEl :cls="'text-h4 pb-6'">Задача</HeadingOneEl>

    {{ tasksStore.getTaskInfo?.task_title }}
    <v-card
      variant="tonal"
      :subtitle="tasksStore.getTaskInfo?.task_body"
      :title="tasksStore.getTaskInfo?.task_title"
    >
      <v-btn @click="tasksStore.deleteFromApiTask(+route.params.id)">Удалить</v-btn>
    </v-card>
  </template>
</template>
