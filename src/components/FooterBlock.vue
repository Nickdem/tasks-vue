<template>
  <p class="text-center text-h6">{{ time }}</p>
</template>

<script setup lang="ts">
import { months } from '@/utils'
import { onMounted, ref } from 'vue'
const time = ref('')
onMounted(() => {
  setInterval(function () {
    time.value = getTime()
  }, 1000)
})

function getTime() {
  const now = new Date()
  const day = now.getDate()
  const month = months[now.getMonth()]
  const year = now.getFullYear()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')

  return `${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`
}
</script>
