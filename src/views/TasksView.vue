<script setup lang="ts">
import LoaderEl from '@/components/LoaderEl.vue'
import { useTaskStore } from '@/stores/task'
import { onMounted } from 'vue'
const tasksStore = useTaskStore()
onMounted(() => {
  if (!tasksStore.getTaskListInfo.length) {
    tasksStore.getFromApiTaskList()
  }
})
</script>

<template>
  <LoaderEl width="60" v-if="tasksStore.getLoadingTasks && !tasksStore.getTaskListInfo.length" />
  <div class="" v-else>
    <div v-for="task in tasksStore.getTaskListInfo" :key="task.id">
      <p>{{ task.task_title }}</p>
      <router-link :to="`/tasks/${task.id}`">перейти</router-link>
    </div>
  </div>
</template>
