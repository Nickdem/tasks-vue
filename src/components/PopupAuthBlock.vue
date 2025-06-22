<template>
  <v-dialog transition="dialog-top-transition" width="auto">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" text="Войти" :class="clsBtn"></v-btn>
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

<script setup lang="ts">
import PopupAuthEl from './PopupAuthEl.vue'
defineProps(['clsBtn'])
</script>
