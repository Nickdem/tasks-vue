<template>
  <pre>
  {{ taskStore.getToCreateTask }}
  {{ userStore.getToCreateUsers }}
  {{ userStore.getUserInfoName }}
  </pre>
  <!-- <form> -->
  <!-- <input type="text" name="task_title" v-model="taskStore.getToCreateTask.task_title" />
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
    <button type="reset">Очистить</button> -->

  <!-- task_title: string
  task_body: string
  task_created_by: string
  task_created_time: string
  task_deadline: string
  task_status: string
  task_fire: string
  task_work_to: string -->
  <!-- </form> -->

  <v-sheet class="mx-auto pa-3">
    <v-form fast-fail @submit.prevent="taskStore.createApiTaskList()">
      <!-- <v-text-field v-model="taskStore.getToCreateTask.task_title" name="task_title" :rules="firstNameRules" label="First name"></v-text-field> -->
      <v-text-field
        v-model="taskStore.getToCreateTask.task_title"
        name="task_title"
        label="Название"
      ></v-text-field>
      <v-textarea
        label="Описание задачи"
        v-model="taskStore.getToCreateTask.task_body"
        name="task_body"
        variant="filled"
        auto-grow
      ></v-textarea>
      <v-date-input
        label="Окончание задачи"
        v-model="taskStore.getToCreateTask.task_deadline"
        variant="outlined"
        locale="ru-RU"
        name="task_deadline"
        persistent-placeholder
      ></v-date-input>
      <v-checkbox
        label="Срочная задача"
        v-model="taskStore.getToCreateTask.task_fire"
        name="task_fire"
        hide-details
      ></v-checkbox>
      <v-select
        label="Исполнитель"
        v-model="taskStore.getToCreateTask.task_to_work"
        :items="userStore.getToCreateUsers.map((usr) => usr.user_fullname)"
      >
      </v-select>
      <!-- <v-dialog transition="dialog-top-transition" width="auto">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            :text="taskStore.getToCreateTask.task_deadline"
            slim
          ></v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-date-picker
              v-model="taskStore.getToCreateTask.task_deadline"
              locale="ru-RU"
            ></v-date-picker>
            <v-card-actions class="justify-end">
              <v-btn text="Закрыть" @click="isActive.value = false"></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog> -->

      <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
// import { computed, onMounted } from 'vue'
import { onMounted } from 'vue'

import { useTaskStore } from '@/stores/task'
import { useUserStore } from '@/stores/user'
// import { formatDateISO } from '@/utils'

const taskStore = useTaskStore()
const userStore = useUserStore()

// function submitForm() {
//   // taskApi()
//   taskStore.createApiTaskList()
// }
onMounted(() => {
  if (!userStore.getUserListInfo.length) {
    userStore.getFromApiUserList()
  }

  taskStore.setNameCreatedBy(userStore.getUserInfoName || 'Администратор')
  taskStore.setStatusCreatedBy('Назначено')
})

// const formatDate = computed(() => {
//   return formatDateISO(taskStore.getToCreateTask.task_deadline)
// })
</script>
