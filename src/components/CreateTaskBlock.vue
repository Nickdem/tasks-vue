<template>
  <!-- <ProgressBarEl :percentage="+validPercentage" />
  <v-text-field
    v-model="percentage"
    type="number"
    name="task_title"
    label="Название"
    variant="solo-filled"
    :rules="titleRules"
    required
  ></v-text-field> -->
  <v-sheet class="mx-auto pa-3">
    <v-form fast-fail ref="formRef" @submit.prevent="submitForm" v-model="isFormValid">
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
      <v-date-input
        label="Окончание задачи"
        v-model="taskStore.getToCreateTask.task_deadline"
        variant="solo-filled"
        name="task_deadline"
        class="to-hide"
        v-on:update:modelValue="
          (nv) => {
            taskStore.setDeadlineDateCreatedBy(nv)
          }
        "
        :rules="dateRules"
        :min="new Date().toISOString().split('T')[0]"
        required
      ></v-date-input>
      <v-select
        label="Исполнитель"
        variant="solo-filled"
        v-model="taskStore.getToCreateTask.task_to_work"
        :items="userStore.getToCreateUsers.map((usr) => usr.user_fullname)"
        :rules="userRules"
        required
      >
      </v-select>
      <v-checkbox
        label="Срочная задача"
        v-model="taskStore.getToCreateTask.task_fire"
        name="task_fire"
        hide-details
      ></v-checkbox>

      <v-btn class="mt-2" type="submit" :disabled="!isFormValid" block>Submit</v-btn>
      <v-btn class="mt-4" color="error" block type="reset"> Reset Form </v-btn>
    </v-form>
  </v-sheet>

  <v-snackbar v-model="snackbar" :timeout="3000" top right>
    {{ snackbarMessage }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useTaskStore } from '@/stores/task'
import { useUserStore } from '@/stores/user'
// import ProgressBarEl from '@/components/ProgressBarEl.vue'

// const percentage = ref(0)

// const validPercentage = computed(() => {
//   // const num = parseFloat(percentage.value)
//   if (isNaN(percentage.value)) {
//     return 0
//   }
//   if (percentage.value < 0) return 0
//   if (percentage.value > 100) return 100
//   return Math.round(percentage.value)
// })

const taskStore = useTaskStore()
const userStore = useUserStore()
const formRef = ref()
const isFormValid = ref(false)
const snackbar = ref(false)
const snackbarMessage = ref('')
const isSubmitting = ref(false)
onMounted(() => {
  if (!userStore.getUserListInfo.length) {
    userStore.getFromApiUserList()
  }

  taskStore.setNameCreatedBy(userStore.getUserInfoName || 'Администратор')
  taskStore.setStatusCreatedBy('Назначено')
})

const titleRules = ref([
  (v: string) => !!v || 'Поле обязательное',
  (v: string) => (v && v.length >= 10) || 'Минимальная длина 10 символов',
])
const bodyRules = ref([
  (v: string) => !!v || 'Поле обязательное',
  (v: string) => (v && v.length >= 20) || 'Минимальная длина 20 символов',
])

const dateRules = ref([
  (v: string) => !!v || 'Поле обязательно для заполнения',
  (v: string) => {
    const selectedDate = new Date(v)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return selectedDate >= today || 'Дата не может быть в прошлом'
  },
])

const userRules = ref([(v: string) => !!v || 'Пожалуйста, выберите исполнителя'])

const submitForm = () => {
  if (formRef.value) {
    isSubmitting.value = true
    const isValid = formRef.value.validate()
    if (isValid) {
      taskStore
        .createApiTaskList()
        .then(() => {
          snackbarMessage.value = 'Задача успешно создана!'
          snackbar.value = true
          formRef.value.reset()
          taskStore.setDeadlineDateCreatedBy(new Date().toISOString().split('T')[0])
        })
        .catch(() => {
          snackbarMessage.value = 'Ошибка при создании задачи!'
          snackbar.value = true
        })
        .finally(() => {
          isSubmitting.value = false
        })
    } else {
      isSubmitting.value = false
    }
  }
}
</script>

<style lang="scss">
.to-hide .v-input__prepend {
  display: none;
}
</style>
