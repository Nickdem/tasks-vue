<script setup lang="ts">
import LoaderEl from '@/components/LoaderEl.vue'
import TaskCardEl from '@/components/TaskCardEl.vue'
import HeadingOneEl from '@/components/HeadingOneEl.vue'
import { useTaskStore } from '@/stores/task'
import { useUserStore } from '@/stores/user'
import { getSessionPaginationLength } from '@/utils'
import { onMounted, ref, watch } from 'vue'
const tasksStore = useTaskStore()
const userStore = useUserStore()
const pageLength = ref(getSessionPaginationLength() || 10)
const tasksType = ref('all')

onMounted(() => {
  console.log(123)

  if (!tasksStore.getTaskListInfo.length || tasksType.value == 'all') {
    getAllTasksByPagination()
  }
})

watch(tasksType, async (newTasksType) => {
  console.log(newTasksType)

  if (newTasksType == 'my') {
    getAllTasksByUser()
  } else {
    getAllTasksByPagination()
  }
})

function getAllTasksByPagination() {
  tasksStore.getFromApiTaskList(`?length=${pageLength.value}&page=0`)
}

function getAllTasksByUser() {
  if (userStore.getUserInfoName) {
    tasksStore.getFromApiTaskList(`?where=${userStore.getUserInfoName}`)
  }
}
</script>

<template>
  <HeadingOneEl :cls="'text-h4 pb-6'">Задачи</HeadingOneEl>
  <LoaderEl width="60" v-if="tasksStore.getLoadingTasks && !tasksStore.getTaskListInfo.length" />
  <template v-else>
    <v-btn-toggle v-model="tasksType" rounded="0" group>
      <v-btn value="all" variant="tonal"> Все </v-btn>
      <v-btn value="my" variant="tonal"> Мои </v-btn>
    </v-btn-toggle>

    <div class="mt-3">
      <TaskCardEl v-for="task in tasksStore.getTaskListInfo" :key="task.id" :task="task" />
    </div>
    <div class="">Всего: {{ tasksStore.getCount }}</div>
    <div v-if="tasksType == 'all'">
      <span>Показывать по:</span>
      <input type="text" v-model="pageLength" @keypress.enter="getAllTasksByPagination" />
    </div>
  </template>
</template>
