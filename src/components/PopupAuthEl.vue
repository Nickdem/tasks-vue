<template>
  <div v-if="userStore.getUserListInfo.length">
    <LoaderEl width="30" v-if="userStore.getLoadingUsers" />
    <button
      v-else
      v-for="(user, idx) in userStore.getUserListInfo"
      :key="idx"
      @click="userStore.getFromApiUser(idx)"
    >
      {{ user.user_fullname }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'
import LoaderEl from './LoaderEl.vue'

const userStore = useUserStore()

onMounted(() => {
  if (!userStore.getUserListInfo.length) {
    userStore.getFromApiUserList()
  }
})
</script>
