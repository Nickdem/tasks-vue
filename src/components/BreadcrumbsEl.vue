<template>
  <v-breadcrumbs :items="props.items" class="px-0" v-if="props.items">
    <!-- <template v-slot:item="{ item }"> -->
    <!-- <pre>{{ item }}</pre> -->
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item class="text-body-2 px-0">
        <router-link v-if="item.to" :to="`${item.to}`" class="text-decoration-none">
          {{ item.title.toUpperCase() }}
        </router-link>
        <span v-else>{{ item.title.toUpperCase() }}</span>
      </v-breadcrumbs-item>
    </template>

    <!-- </template> -->
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
