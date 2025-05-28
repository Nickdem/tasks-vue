<script setup lang="ts">
import LoaderEl from '@/components/LoaderEl.vue'
import TaskCardEl from '@/components/TaskCardEl.vue'
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
  // if (newQuestion.includes('?')) {
  //   loading.value = true
  //   answer.value = 'Thinking...'
  //   try {
  //     const res = await fetch('https://yesno.wtf/api')
  //     answer.value = (await res.json()).answer
  //   } catch (error) {
  //     answer.value = 'Error! Could not reach the API. ' + error
  //   } finally {
  //     loading.value = false
  //   }
  // }
})

function getAllTasksByPagination() {
  // tasksType.value = 'all'
  tasksStore.getFromApiTaskList(`?length=${pageLength.value}&page=0`)
}

function getAllTasksByUser() {
  if (userStore.getUserInfoName) {
    // tasksType.value = userStore.getUserInfoName
    tasksStore.getFromApiTaskList(`?where=${userStore.getUserInfoName}`)
  }
}
</script>

<template>
  <LoaderEl width="60" v-if="tasksStore.getLoadingTasks && !tasksStore.getTaskListInfo.length" />
  <template v-else>
    <!-- <v-row no-gutters>
      <v-col cols="12" sm="1">
      </v-col>
      <v-col cols="12" sm="1">
     
      </v-col>
    </v-row> -->
    <v-btn-toggle v-model="tasksType" rounded="0" group>
      <v-btn value="all" variant="tonal"> Все </v-btn>
      <v-btn value="my" variant="tonal"> Мои </v-btn>
    </v-btn-toggle>

    <!-- <div v-for="task in tasksStore.getTaskListInfo" :key="task.id">
      <p>{{ task.task_title }}</p>
      <router-link :to="`/tasks/${task.id}`">перейти</router-link>
    </div> -->
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
