<script setup lang="ts">
import LoaderEl from '@/components/LoaderEl.vue'
import { useTaskStore } from '@/stores/task'
import { useUserStore } from '@/stores/user'
import { getSessionPaginationLength } from '@/utils'
import { onMounted, ref } from 'vue'
const tasksStore = useTaskStore()
const userStore = useUserStore()
const pageLength = ref(getSessionPaginationLength() || 10)
const tasksType = ref('all')

onMounted(() => {
  if (!tasksStore.getTaskListInfo.length) {
    getAllTasksByPagination()
  }
})

function getAllTasksByPagination() {
  tasksType.value = 'all'
  tasksStore.getFromApiTaskList(`?length=${pageLength.value}&page=0`)
}

function getAllTasksByUser() {
  if (userStore.getUserInfoName) {
    tasksType.value = userStore.getUserInfoName
    tasksStore.getFromApiTaskList(`?where=${tasksType.value}`)
  }
}
</script>

<template>
  <LoaderEl width="60" v-if="tasksStore.getLoadingTasks && !tasksStore.getTaskListInfo.length" />
  <div class="" v-else>
    <button @click="getAllTasksByPagination">Все</button>
    <button v-if="userStore.getUserInfoName" @click="getAllTasksByUser">Мои</button>
    <div v-for="task in tasksStore.getTaskListInfo" :key="task.id">
      <p>{{ task.task_title }}</p>
      <router-link :to="`/tasks/${task.id}`">перейти</router-link>
    </div>
    <div class="">Всего: {{ tasksStore.getCount }}</div>
    <div v-if="tasksType == 'all'">
      <span>Показывать по:</span>
      <input type="text" v-model="pageLength" @keypress.enter="getAllTasksByPagination" />
    </div>
  </div>
</template>
