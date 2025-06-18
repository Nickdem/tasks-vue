<script setup lang="ts">
import HeadingOneEl from '@/components/HeadingOneEl.vue'
import { useTaskStore } from '@/stores/task'
import { ref } from 'vue'
import MyTasksBlock from '@/components/MyTasksBlock.vue'
import AllTasksBlock from '@/components/AllTasksBlock.vue'
const tasksStore = useTaskStore()
const tasksType = ref('all')
</script>

<template>
  <HeadingOneEl :cls="'text-h4 pb-6'">Задачи</HeadingOneEl>

  <v-row justify="space-between" class="mx-4 my-4">
    <v-btn-toggle v-model="tasksType" rounded="0" group>
      <v-btn value="all" variant="tonal"> Все </v-btn>
      <v-btn value="my" variant="tonal"> Мои </v-btn>
    </v-btn-toggle>

    <v-chip>
      Всего задач ({{ tasksType == 'all' ? 'все' : 'мои' }}): {{ tasksStore.getCount }}</v-chip
    >
  </v-row>

  <MyTasksBlock v-if="tasksType == 'my'" />
  <AllTasksBlock v-else />
</template>
