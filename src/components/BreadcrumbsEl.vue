<template>
  <v-breadcrumbs :items="items" class="px-0" v-if="items">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item class="text-body-2 px-0">
        <router-link v-if="item.to" :to="`${item.to}`" class="text-decoration-none">
          {{ item.title.toUpperCase() }}
        </router-link>
        <span v-else>{{ item.title.toUpperCase() }}</span>
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script setup lang="ts">
defineProps(['items'])
</script>
