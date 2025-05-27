<template>
  <div class="app-header__auth">
    <div class="app-header__auth-wr" v-if="!userStore.loadingUser">
      <!-- <button
        class="app-header__auth-btn"
        @click="!userStore.getUserInfoName ? openPopupAuth() : closePopupAuth()"
      >
        {{ !userStore.getUserInfoName ? 'Войти' : 'Выйти' }}
      </button> -->

      <!-- <PopupAuthEl v-if="showAuthPopup && !userStore.getUserInfoName" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
// import LoaderEl from './LoaderEl.vue'
// import PopupAuthEl from './PopupAuthEl.vue'
import { onMounted } from 'vue'

import { getSessionUser, type UserInfo } from '@/utils'
// const showAuthPopup = ref(false)

const userStore = useUserStore()

onMounted(() => {
  const { endTime, taskUser } = getSessionUser()
  if (endTime != null) {
    if (+endTime < Date.now()) {
      userStore.setUser(null)
    } else if (taskUser) {
      const user: UserInfo = JSON.parse(taskUser)
      userStore.setUser(user)
    }
  }
})
</script>
