<template>
  <!-- <p>header</p> -->

  <!-- <div v-if="userStore.loadingUser">загрузка</div>
  <div v-else>{{userStore.getUserInfoName}}</div> -->
  <header class="app-header">
    <div class="app-header__left">
      <h1><router-link to="/"> Таска</router-link></h1>
    </div>

    <div class="app-header__right">
      <LoaderEl width="20" v-if="userStore.loadingUser" />
      <div class="app-header__auth">
        <router-link to="/create" v-if="userStore.getUserInfoName">Создать</router-link>
        <router-link to="/profile" v-if="userStore.getUserInfoName"
          >Профиль ({{ userStore.getUserInfoName }})</router-link
        >
        <button
          class="app-header__auth-btn"
          @click="
            !userStore.getUserInfoName ? userStore.getFromApiUser(1) : userStore.setUser(null)
          "
        >
          {{ !userStore.getUserInfoName ? 'Войти' : 'Выйти' }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// import { useTaskStore } from '@/stores/task';
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'
import LoaderEl from './LoaderEl.vue'
// const taskStore = useTaskStore()
const userStore = useUserStore()
// const loading = ref(false)
// const error = ref(false)
// console.log(userStore)
// console.log(taskStore);
// export default {
//   computed: {
//     ...mapState(useCounterStore, ['count'])}
//   }
// function setLoading(value: boolean) {
//   loading.value = value
// }
// function setError(value: boolean) {
//   error.value = value
// }

// watch(() => $route.params.id, fetchData, { immediate: true })

// async function fetchData(id:number) {
//  console.log(id);

//   setLoading(true);
// try {
//   // replace `getPost` with your data fetching util / API wrapper
//   post.value = await getPost(id)
// } catch (err) {
//   error.value = err.toString()
// } finally {
//   loading.value = false
// }
// }
// watch(userStore, async (newUserInfo: UserInfo, oldUserInfo: UserInfo) => {
//   console.log(newUserInfo)
//   console.log(oldUserInfo)
// })
onMounted(() => {
  // console.log(`user info ${userStore.getUserInfo}.`)
  // setTimeout(() => {
  //   setLoading(false)
  //   setError(true)
  //   fetchData(1);
  // }, 2000)
  // setLoading(true)
  // userStore.getFromApiUserList()
  // if (!userStore.getUserInfoName) {
  //   console.log(123)
  //   userStore.getFromApiUser(1)
  // }
})
</script>
