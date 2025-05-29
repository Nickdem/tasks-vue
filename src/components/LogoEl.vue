<template>
  <!-- <div class="text-h6 font-weight-black"> -->
  <router-link to="/" class="text-decoration-none">
    <v-img :src="img" :width="150"></v-img
  ></router-link>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'

const img = ref('src/assets/img/task.svg')
</script>
