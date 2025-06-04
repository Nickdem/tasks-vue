<template>
  <v-row class="justify-center align-center flex-column-reverse flex-md-row pt-16">
    <v-col cols="12" md="6">
      <HeadingOneEl :cls="'text-h1 mb-8'">{{ title }}</HeadingOneEl>
      <p class="text-h3 mb-8 font-weight-thin">{{ subtitle }}</p>
      <a :href="link" target="_blank"
        ><v-btn class="elevation-4 rounded-xl mb-4">{{ linkText }}</v-btn></a
      >
    </v-col>
    <v-col cols="12" md="6"> </v-col>
  </v-row>
</template>

<script setup lang="ts">
import HeadingOneEl from '@/components/HeadingOneEl.vue'

defineProps(['title', 'subtitle', 'link', 'linkText'])
</script>
