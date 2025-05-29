<template>
  <p class="text-center text-h6">{{ time }}</p>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
const time = ref('')
onMounted(() => {
  setInterval(function () {
    time.value = getTime()
  }, 1000)
})

function getTime() {
  const today = new Date()
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  const dateTime = date + ' ' + time
  return dateTime
}
</script>
