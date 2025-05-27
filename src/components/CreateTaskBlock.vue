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
        variant="solo-filled"
        :rules="titleRules"
        required
      ></v-text-field>
      <v-textarea
        label="Описание задачи"
        v-model="taskStore.getToCreateTask.task_body"
        name="task_body"
        variant="solo-filled"
        auto-grow
        :rules="bodyRules"
        required
      ></v-textarea>
      <!-- <input type="date" name="task_deadline" v-model="taskStore.getToCreateTask.task_deadline" /> -->
      <v-date-input
        label="Окончание задачи"
        v-model="taskStore.getToCreateTask.task_deadline"
        variant="solo-filled"
        name="task_deadline"
        class="to-hide"
        v-on:update:modelValue="
          (k) => {
            taskStore.setDeadlineDateCreatedBy(k)
          }
        "
        :rules="dateRules"
        :min="new Date().toISOString().split('T')[0]"
        required
      ></v-date-input>
      <!--   :hide-weekdays="true"  :display-format="format"
        prefix="ISO Date:"
:onchange="(e:any) => console.log(e)"
        v-on:save="(k) => { taskStore.setDeadlineDateCreatedBy(k), console.log('kek', k.toLocaleString()), console.log('kkk-',k), console.log('kkk-',Date.parse(k)), console.log('kkk-', formatDateISO(new Date(k)))}" -->
      <v-select
        label="Исполнитель"
        variant="solo-filled"
        v-model="taskStore.getToCreateTask.task_to_work"
        :items="userStore.getToCreateUsers.map((usr) => usr.user_fullname)"
        required
      >
      </v-select>
      <v-checkbox
        label="Срочная задача"
        v-model="taskStore.getToCreateTask.task_fire"
        name="task_fire"
        hide-details
      ></v-checkbox>
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
      <v-btn class="mt-4" color="error" block type="reset"> Reset Form </v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
// import { computed, onMounted } from 'vue'
import { onMounted, ref } from 'vue'

import { useTaskStore } from '@/stores/task'
import { useUserStore } from '@/stores/user'
// import { formatDateISO } from '@/utils'
// import { useDate } from 'vuetify'
// import { formatDateISO } from '@/utils'
// const adapter = useDate()
const taskStore = useTaskStore()
const userStore = useUserStore()
// function format (date: Date) {
//   console.log(adapter.toISO(date));

//     return adapter.toISO(date)
//   }
// const menu = ref(false)
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

const titleRules = ref([
  (v: string) => !!v || 'Поле обязательное',
  (v: string) => (v && v.length >= 10) || 'Минимальная длина 10 символов',
])
const bodyRules = ref([
  (v: string) => !!v || 'Поле обязательное',
  (v: string) => (v && v.length >= 20) || 'Минимальная длина 20 символов',
])
const dateRules = ref([])
</script>

<style lang="scss">
.to-hide .v-input__prepend {
  display: none;
}
</style>
