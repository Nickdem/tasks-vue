<script setup lang="ts">
import LoaderEl from '@/components/LoaderEl.vue'
import { useTaskStore } from '@/stores/task'
import { onMounted } from 'vue'
const tasksStore = useTaskStore()
import { useRoute } from 'vue-router'
const route = useRoute()
// const re = useRouter()
// console.log(r.params, '___' , re)
onMounted(() => {
  tasksStore.getFromApiTask(+route.params.id)
})
// console.log(route);
</script>

<template>
  <LoaderEl v-if="tasksStore.currentTaskLoading" />
  <div class="" v-else>
    {{ tasksStore.getTaskInfo?.task_title }}
  </div>
  <!-- <p>Detail task {{ route.params.id }}</p> -->
</template>
