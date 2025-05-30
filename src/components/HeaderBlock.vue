<template>
  <LogoEl />

  <v-spacer></v-spacer>

  <LoaderEl width="20" v-if="userStore.loadingUser" />
  <template v-else>
    <template v-if="userStore.getUserInfoName">
      <router-link to="/create" v-if="userStore.getUserInfoJob == 'Менеджер'">
        <v-btn variant="text"> Создать </v-btn>
      </router-link>
      <router-link to="/tasks">
        <v-btn variant="text"> Задачи </v-btn>
      </router-link>
      <router-link to="/profile">
        <v-btn variant="text"> Профиль ({{ userStore.getUserInfoName }}) </v-btn>
      </router-link>
      <v-btn text="Выйти" slim @click="logoutHandler"></v-btn>
    </template>

    <v-dialog transition="dialog-top-transition" width="auto" v-else>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps" text="Войти" slim></v-btn>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-toolbar title="Залогиньтесь!"></v-toolbar>
          <PopupAuthEl />
          <v-card-actions class="justify-end">
            <v-btn text="Закрыть" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </template>

  <v-btn class="ml-sm-2" text="Тема" border slim @click="applStore.toggleTheme"></v-btn>
</template>

<script setup lang="ts">
import { useApplStore } from '@/stores/appl'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'
import LogoEl from './LogoEl.vue'
import PopupAuthEl from './PopupAuthEl.vue'
import LoaderEl from './LoaderEl.vue'
import { getSessionUser, type UserInfo } from '@/utils'
const router = useRouter()
const applStore = useApplStore()
const userStore = useUserStore()

function logoutHandler() {
  userStore.setUser(null)
  router.push('/')
}

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
