<script setup lang="ts">
import LoaderEl from '@/components/LoaderEl.vue'

import TaskCardEl from '@/components/TaskCardEl.vue'
import { useTaskStore } from '@/stores/task'
import { getSessionPaginationLength } from '@/utils'
import { onMounted, ref, watch } from 'vue'

const tasksStore = useTaskStore()
const pageLength = ref(getSessionPaginationLength() || 4)
const page = ref(1)

onMounted(() => {
  getAllTasksByPagination()

  //   page.value = 1
})

function getAllTasksByPagination() {
  tasksStore.getFromApiTaskList(`?length=${pageLength.value}&page=${page.value}`)
}

function updatePage(nv: number) {
  page.value = nv
  getAllTasksByPagination()
}

let pageLengthTimeout: ReturnType<typeof setTimeout> | null = null

watch(pageLength, (newPageLength) => {
  if (pageLengthTimeout) {
    clearTimeout(pageLengthTimeout)
  }
  if (!/^\d+$/.test(newPageLength.toString())) {
    pageLength.value = +newPageLength.toString().replace(/[^\d]/g, '')
  }
  if (+newPageLength < 2 || !newPageLength) {
    pageLength.value = 2
  }
  page.value = 1
  pageLengthTimeout = setTimeout(() => {
    getAllTasksByPagination()
  }, 800)
})
</script>

<template>
  <LoaderEl width="60" v-if="tasksStore.getLoadingTasks || !tasksStore.getTaskListInfo.length" />
  <template v-else>
    <div class="mt-3">
      <TaskCardEl v-for="task in tasksStore.getTaskListInfo" :key="task.id" :task="task" />
    </div>

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

    <v-text-field label="Показывать по:" v-model="pageLength"></v-text-field
  ></template>
  <!-- @keypress.enter="getAllTasksByPagination"
        @input="getAllTasksByPagination" -->
</template>
