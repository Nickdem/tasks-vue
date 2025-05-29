<script setup lang="ts">
import HeaderBlock from '@/components/HeaderBlock.vue'
import FooterBlock from '@/components/FooterBlock.vue'
import { useApplStore } from '@/stores/appl'
import BreadcrumbsEl from '@/components/BreadcrumbsEl.vue'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import type { RouteMetaMod } from '@/utils'
// import type { BreadcrumbInfo } from '@/utils'

const route = useRoute()
// const router = useRouter()
// const userData = ref()

const applStore = useApplStore()
// fetch the user information when params change
watch(
  () => route.matched,
  async (newMatched) => {
    const meta: RouteMetaMod = newMatched[0].meta

    if (meta.breadcrumbs) {
      applStore.setBreadcrumbsList(meta.breadcrumbs)
    }
  },
)
// import { watch } from 'vue'
// import { useRoute } from 'vue-router'
// import { onBeforeRouteUpdate } from 'vue-router'

// onBeforeRouteUpdate(() => {
//   console.log(123)
// })
// import { useRoute } from 'vue-router'
// import { onUpdated } from 'vue'

// import { ref } from 'vue'

// const theme = ref('light')

// function onClick() {
//   theme.value = theme.value === 'light' ? 'dark' : 'light'
// }
// const route = useRoute()
// console.log(route);

// onUpdated(() => {
//   console.log('upd',route);
//   const matchedRoutes = route.matched
//   console.log(matchedRoutes)
// },)

// const route = useRoute()
// const userData = ref()

// fetch the user information when params change
// watch(
//   () => route.params.id,
//   async newId => {
//     // userData.value = await fetchUser(newId)
//   }
// )
// import { useRouter } from 'vue-router'

// const router = useRouter()

// const isHomePage = () => {
//   return router.currentRoute.value.name === 'home'
//   // or router.currentRoute.value.path === '/'
// }
</script>

<template>
  <v-responsive>
    <v-app :theme="applStore.theme">
      <v-app-bar class="px-3">
        <HeaderBlock />
      </v-app-bar>

      <v-main>
        <!-- <v-container v-if="router.currentRoute.value.name !== 'home'">
          <BreadcrumbsEl :items="applStore.getBreadcrumbsList" />
          <slot></slot>
        </v-container>
        <template v-else> <slot></slot></template> -->
        <v-container>
          <BreadcrumbsEl :items="applStore.getBreadcrumbsList" />
          <slot></slot>
        </v-container>
      </v-main>
      <!-- <v-main>
        <v-container fill-height>
          <router-view v-slot="{ Component, route }">
            <transition name="slide-x" mode="out-in">
              <component :is="Component" :key="route.path" />
            </transition>
          </router-view>
        </v-container>
      </v-main> -->
      <!-- <slot></slot> -->
      <v-footer border :height="100" class="d-flex align-center justify-center" :app="true">
        <FooterBlock
      /></v-footer>
    </v-app>
  </v-responsive>
</template>
