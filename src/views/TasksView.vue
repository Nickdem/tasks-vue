<script setup lang="ts">
import LoaderEl from '@/components/LoaderEl.vue'
import { useTaskStore } from '@/stores/task'
import { getSessionPaginationLength } from '@/utils'
import { onMounted, ref } from 'vue'
const tasksStore = useTaskStore()
const pageLength = ref(getSessionPaginationLength() || 2)

onMounted(() => {
  if (!tasksStore.getTaskListInfo.length) {
    // tasksStore.getFromApiTaskList('')
  }
})

function getAllTasksByPagination() {
  tasksStore.getFromApiTaskList(`?length=${pageLength.value}&page=0`)
}
</script>

<template>
  <LoaderEl width="60" v-if="tasksStore.getLoadingTasks && !tasksStore.getTaskListInfo.length" />
  <div class="" v-else>
    <button>Все</button>
    <button>Мои</button>
    <div v-for="task in tasksStore.getTaskListInfo" :key="task.id">
      <p>{{ task.task_title }}</p>
      <router-link :to="`/tasks/${task.id}`">перейти</router-link>
    </div>
    <div class="">
      <span>Показывать по:</span>
      <input type="text" v-model="pageLength" @keypress.enter="getAllTasksByPagination" />
    </div>
  </div>
</template>
