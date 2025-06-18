<script setup lang="ts">
import HeadingOneEl from '@/components/HeadingOneEl.vue'
import { useUserStore } from '@/stores/user'
import { randomInteger } from '@/utils'
import { onMounted } from 'vue'

const userStore = useUserStore()
onMounted(() => {
  if (!userStore.getUserListInfo.length) {
    userStore.getFromApiUserList()
  }
})
</script>

<template>
  <HeadingOneEl :cls="'text-h4 pb-6'">Профиль</HeadingOneEl>
  <v-row
    v-if="userStore.getUserInfoName"
    class="justify-center align-center flex-column-reverse flex-md-row"
    ><v-col class="text-center" cols="12" md="6">
      <v-avatar :size="300" class="elevation-12 mx-auto mb-8">
        <v-img :src="`https://randomuser.me/api/portraits/lego/${randomInteger(1, 9)}.jpg`"></v-img>
      </v-avatar>
    </v-col>
    <v-col cols="12" md="6">
      <p class="text-h5 mb-8">Имя: {{ userStore.getUserInfo?.user_fullname }}</p>
      <p class="text-h6 mb-8 font-weight-thin">Должность: {{ userStore.getUserInfo?.user_job }}</p>
      <v-card max-width="300" v-if="userStore.getUserListInfo">
        <v-list :items="userStore.getUserListInfo">
          <v-list-subheader>Группа</v-list-subheader>
          <v-list-item
            v-for="item in userStore.getUserListInfo"
            :key="item.id"
            :value="item"
            color="primary"
          >
            <template v-slot:prepend>
              <v-avatar :size="30" class="elevation-12 mx-auto">
                <v-img
                  :src="`https://randomuser.me/api/portraits/lego/${randomInteger(1, 9)}.jpg`"
                ></v-img>
              </v-avatar>
            </template>

            <v-list-item-title>{{ item.user_fullname }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>
