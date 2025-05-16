<template>
  <LoaderEl width="20" v-if="userStore.loadingUser" />
  <div class="app-header__auth">
    <template v-if="userStore.getUserInfoName">
      <router-link to="/create" v-if="userStore.getUserInfoJob == 'Менеджер'">Создать</router-link>
      <router-link to="/tasks">Задачи</router-link>
      <router-link to="/profile">Профиль ({{ userStore.getUserInfoName }})</router-link>
    </template>

    <div class="app-header__auth-wr" v-if="!userStore.loadingUser">
      <button
        class="app-header__auth-btn"
        @click="!userStore.getUserInfoName ? openPopupAuth() : closePopupAuth()"
      >
        {{ !userStore.getUserInfoName ? 'Войти' : 'Выйти' }}
      </button>
      <PopupAuthEl v-if="showAuthPopup && !userStore.getUserInfoName" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import LoaderEl from './LoaderEl.vue'
import PopupAuthEl from './PopupAuthEl.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getSessionUser, type UserInfo } from '@/utils'
const showAuthPopup = ref(false)

const userStore = useUserStore()
const router = useRouter()

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

function openPopupAuth() {
  showAuthPopup.value = true
}
function closePopupAuth() {
  userStore.setUser(null)
  showAuthPopup.value = false
  router.push('/')
}
</script>
