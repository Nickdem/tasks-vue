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
const page = ref(1)
onMounted(() => {
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
  tasksStore.getFromApiTaskList(`?length=${pageLength.value}&page=${page.value}`)
}

function getAllTasksByUser() {
  if (userStore.getUserInfoName) {
    tasksStore.getFromApiTaskList(`?where=${userStore.getUserInfoName}`)
  }
}
function updatePage(nv: number) {
  console.log(nv)

  page.value = nv
  getAllTasksByPagination()
}

watch(pageLength, (newPageLength) => {
  // console.log(`x is ${newPageLength}`)
  if (!/^\d+$/.test(newPageLength.toString())) {
    pageLength.value = +newPageLength.toString().replace(/[^\d]/g, '')
  }
  if (+newPageLength < 2 || !newPageLength) {
    pageLength.value = 2
  }
})
</script>

<template>
  <HeadingOneEl :cls="'text-h4 pb-6'">Задачи</HeadingOneEl>
  <LoaderEl width="60" v-if="tasksStore.getLoadingTasks && !tasksStore.getTaskListInfo.length" />
  <template v-else>
    <v-row justify="space-between" class="mx-4 my-4">
      <v-btn-toggle v-model="tasksType" rounded="0" group>
        <v-btn value="all" variant="tonal"> Все </v-btn>
        <v-btn value="my" variant="tonal"> Мои </v-btn>
      </v-btn-toggle>

      <v-chip> Всего задач: {{ tasksStore.getCount }}</v-chip>
    </v-row>
    <div class="mt-3">
      <TaskCardEl v-for="task in tasksStore.getTaskListInfo" :key="task.id" :task="task" />
    </div>

    <div v-if="tasksType == 'all'">
      <!-- {{ tasksStore.getCount }}
    {{ pageLength }}
    {{ page }} -->
      <v-pagination
        v-model="page"
        :length="Math.ceil(+tasksStore.getCount / +pageLength)"
        rounded="circle"
        v-on:update:modelValue="
          (nv) => {
            updatePage(nv)
          }
        "
      ></v-pagination>

      <v-text-field
        label="Показывать по:"
        v-model="pageLength"
        @keypress.enter="getAllTasksByPagination"
        @change="getAllTasksByPagination"
      ></v-text-field>
    </div>
  </template>
</template>
