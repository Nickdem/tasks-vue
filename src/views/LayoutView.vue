<script setup lang="ts">
import HeaderBlock from '@/components/HeaderBlock.vue'
import FooterBlock from '@/components/FooterBlock.vue'
import { useApplStore } from '@/stores/appl'
import BreadcrumbsEl from '@/components/BreadcrumbsEl.vue'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import type { RouteMetaMod } from '@/utils'
import { useRouter } from 'vue-router'

const route = useRoute()

const applStore = useApplStore()
watch(
  () => route.matched,
  async (newMatched) => {
    const meta: RouteMetaMod = newMatched[0].meta

    if (meta.breadcrumbs) {
      applStore.setBreadcrumbsList(meta.breadcrumbs)
    }
  },
)

const router = useRouter()
</script>

<template>
  <v-responsive>
    <v-app :theme="applStore.theme">
      <v-app-bar class="px-3">
        <HeaderBlock />
      </v-app-bar>

      <v-main>
        <v-container>
          <BreadcrumbsEl
            :items="applStore.getBreadcrumbsList"
            v-if="router.currentRoute.value.name !== 'home'"
          />
          <slot></slot>
        </v-container>
      </v-main>

      <v-footer border :height="100" class="d-flex align-center justify-center" :app="true">
        <FooterBlock
      /></v-footer>
    </v-app>
  </v-responsive>
</template>
