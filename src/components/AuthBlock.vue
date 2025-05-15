<template>
  <LoaderEl width="20" v-if="userStore.loadingUser" />
  <div class="app-header__auth">
    <template v-if="userStore.getUserInfoName">
      <router-link to="/create">Создать</router-link>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const showAuthPopup = ref(false)

const userStore = useUserStore()
const router = useRouter()
function openPopupAuth() {
  showAuthPopup.value = true
}
function closePopupAuth() {
  userStore.setUser(null)
  showAuthPopup.value = false
  router.push('/')
}
</script>
