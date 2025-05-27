<script setup lang="ts">
import HeaderBlock from '@/components/HeaderBlock.vue'
import FooterBlock from '@/components/FooterBlock.vue'
import { useApplStore } from '@/stores/appl'

// import { ref } from 'vue'

// const theme = ref('light')

// function onClick() {
//   theme.value = theme.value === 'light' ? 'dark' : 'light'
// }
const applStore = useApplStore()
</script>

<template>
  <v-responsive>
    <v-app :theme="applStore.theme">
      <v-app-bar class="px-3">
        <HeaderBlock />
      </v-app-bar>

      <v-main>
        <v-container>
          <slot></slot>
        </v-container>
      </v-main>
    </v-app>

    <v-footer border> <FooterBlock /></v-footer>
  </v-responsive>
</template>
