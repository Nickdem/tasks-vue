<script setup lang="ts">
import LoaderEl from '@/components/LoaderEl.vue'
import TaskCardEl from '@/components/TaskCardEl.vue'
import { useTaskStore } from '@/stores/task'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'

const tasksStore = useTaskStore()
const userStore = useUserStore()

onMounted(() => {
  getAllTasksByUser()
})

function getAllTasksByUser() {
  if (userStore.getUserInfoName) {
    tasksStore.getFromApiTaskList(
      `?where=${userStore.getUserInfoName}&type=${userStore.getUserInfoJob}`,
    )
  }
}
</script>

<template>
  <div class="mt-3">
    <LoaderEl width="60" v-if="tasksStore.getLoadingTasks || !tasksStore.getTaskListInfo.length" />
    <template v-else>
      <TaskCardEl v-for="task in tasksStore.getTaskListInfo" :key="task.id" :task="task" />
    </template>
  </div>
</template>
