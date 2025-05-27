<template>
  <v-breadcrumbs :items="props.items">
    <template v-slot:title="{ item }">
      {{ item.title.toUpperCase() }}
    </template>
  </v-breadcrumbs>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
// import { useRoute } from 'vue-router'
const props = defineProps(['items'])

// const route = useRoute()
// const route = useRouter()
// console.log(router);

// console.log(route);

// const matchedRoutes = route.matched
// console.log(matchedRoutes)
// const breadcrumbs = computed(() => {
//   return matchedRoutes.map((routeItem) => {
//     console.log(routeItem)
//     return {
//       title: routeItem.meta.breadcrumb || routeItem.name,
//       //to: this.getRoutePath(route, routeItem),
//     }
//   })
// })
// computed: {
//     breadcrumbs() {
//       const route = this.$route;
//       const matchedRoutes = route.matched;

//       return matchedRoutes.map((routeItem) => ({
//         label: routeItem.meta.breadcrumb || routeItem.name,
//         to: this.getRoutePath(route, routeItem),
//       }));
//     },
//   },
//   methods: {
//     getRoutePath(route, routeItem) {
//       const matchedSegments = route.matched.slice(0, route.matched.indexOf(routeItem) + 1);
//       return matchedSegments.map((segment) => segment.path).join('/');
//     },
//   },
</script>
