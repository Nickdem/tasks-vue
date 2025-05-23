<script setup lang="ts">
import { onMounted } from 'vue'
// import {taskApi} from '@/utils.ts'
// const formValues = ref({
//   task_title: '',
//   task_body: '',
//   task_created_by: '',
//   task_created_time: '',
//   task_deadline: '',
//   task_status: '',
//   task_fire: false,
//   task_work_to: '',
// })

import { useTaskStore } from '@/stores/task'
import { useUserStore } from '@/stores/user'

const taskStore = useTaskStore()
const userStore = useUserStore()

function submitForm() {
  // taskApi()
  taskStore.createApiTaskList()
}
onMounted(() => {
  if (!userStore.getUserListInfo.length) {
    userStore.getFromApiUserList()
  }

  taskStore.setNameCreatedBy(userStore.getUserInfoName)
  taskStore.setStatusCreatedBy('Назначено')
})
</script>

<template>
  <pre>
  {{ taskStore.getToCreateTask }}
  {{ userStore.getToCreateUsers }}
  {{ userStore.getUserInfoName }}
  </pre>
  <form>
    <input type="text" name="task_title" v-model="taskStore.getToCreateTask.task_title" />
    <textarea name="task_body" v-model="taskStore.getToCreateTask.task_body"></textarea>
    <input type="date" name="task_deadline" v-model="taskStore.getToCreateTask.task_deadline" />
    <input
      type="checkbox"
      name="task_fire"
      v-model="taskStore.getToCreateTask.task_fire"
      :checked="taskStore.getToCreateTask.task_fire"
    />
    <select
      v-if="userStore.getToCreateUsers.length"
      name="task_work_to"
      v-model="taskStore.getToCreateTask.task_to_work"
    >
      <option value="" disabled>Выберите исполнителя</option>
      <option
        v-for="userToWork in userStore.getToCreateUsers"
        :key="userToWork.id"
        :value="userToWork.user_fullname"
      >
        {{ userToWork.user_fullname }}
      </option>
    </select>
    <button type="submit" @click.prevent="submitForm">Создать</button>
    <button type="reset">Очистить</button>

    <!-- task_title: string
  task_body: string
  task_created_by: string
  task_created_time: string
  task_deadline: string
  task_status: string
  task_fire: string
  task_work_to: string -->
  </form>
</template>
