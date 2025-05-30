<template>
  <div v-if="userStore.getUserListInfo.length">
    <LoaderEl width="30" v-if="userStore.getLoadingUsers" />

    <v-container class="text-center" v-else>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
          v-for="user in userStore.getUserListInfo"
          :key="user.id"
          @click="userStore.getFromApiUser(user.id)"
        >
          <v-btn variant="tonal" size="small" block>{{ user.user_fullname }}</v-btn>
        </v-col>
      </v-row>
    </v-container>
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
