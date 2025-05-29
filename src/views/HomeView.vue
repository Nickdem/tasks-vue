<script setup lang="ts">
// import { ref } from 'vue'
// const bg = r1ef('src/assets/img/bg.png')
</script>

<template>
  <!-- <v-parallax :src="bg"> -->
  <v-container class="fill-height">
    <v-row class="justify-center align-center flex-column-reverse flex-md-row">
      <v-col cols="12" md="6">
        <h1 class="text-h1 mb-8">Таска</h1>
        <p class="text-h3 mb-8 font-weight-thin">Учебный проект с использованием API</p>
        <a href="https://github.com/nickdem/" target="_blank"
          ><v-btn class="elevation-4 rounded-xl mb-4" color="primary"> тут GitHub</v-btn></a
        >
      </v-col>
      <v-col class="text-center" cols="12" md="6">
        <!-- <v-img :src="img" ></v-img> -->
      </v-col>
    </v-row>
  </v-container>
  <!-- </v-parallax> -->
</template>
