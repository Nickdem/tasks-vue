<script setup lang="ts">
import { RouterView } from 'vue-router'
import LayoutView from '@/views/LayoutView.vue'
</script>

<template>
  <LayoutView>
    <RouterView />
  </LayoutView>
</template>

<style lang="scss">
header a {
  color: inherit;
}
.task-cart a {
  color: inherit;
}
.v-breadcrumbs-item span {
  opacity: 0.7;
}
.v-breadcrumbs-item a {
  color: inherit;
}
/* v-slide-x-transition look a like */
.slide-x-enter-active,
.slide-x-leave-active {
  transition:
    transform 0.6s cubic-bezier(0.25, 0.8, 0.5, 1),
    opacity 0.8s;
  opacity: 1;
}

.slide-x-enter-from,
.slide-x-leave-to {
  opacity: 0;
}

.slide-x-enter-from {
  transform: translateX(100px);
}

.slide-x-leave-to {
  transform: translateX(-100px);
}
// @use '@/assets/scss/_mixins' as m;
// @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

// $main-offset: 14px;

// $container-width: 1366px;

// $font-size: 10px;

// $font-weight: 400;

// $line-height: $font-size * 1.6;

// $font-family: 'Roboto', sans-serif;

// html {
//   font-family: $font-family;
//   font-optical-sizing: auto;
//   font-style: normal;
//   @include m.textOpt($font-size, $line-height, $font-weight);
// }

// body * {
//   box-sizing: border-box;
// }

// html,
// body {
//   overflow-x: hidden;
// }

// * {
//   @include m.paddings(0, 0, 0, 0);
//   @include m.margins(0, 0, 0, 0);
//   &::-webkit-scrollbar {
//     width: 6px;
//     background-color: var(--white-clr);
//   }

//   &::-webkit-scrollbar-track {
//     border-radius: 0px;
//     box-shadow: inset 0 0 2px var(--grey-clr);
//     background: var(--white-clr);
//   }

//   &::-webkit-scrollbar-thumb {
//     border-radius: 0;
//     border: 0 none #fff;
//     background-color: var(--black-clr);
//   }
// }
</style>
