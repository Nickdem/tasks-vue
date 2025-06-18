<template>
  <div class="progress-circle">
    <svg viewBox="0 0 120 120" width="150" height="150">
      <!-- Фон кружка -->
      <circle cx="60" cy="60" r="54" stroke="#e6e6e6" stroke-width="12" fill="none" />

      <!-- Закрашенный сектор -->
      <circle
        cx="60"
        cy="60"
        r="54"
        stroke="#3498db"
        stroke-width="12"
        fill="none"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        transform="rotate(-90 60 60)"
      />

      <!-- Центр текста -->
      <text x="60" y="65" text-anchor="middle" font-size="24" fill="#333">{{ percentage }}%</text>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import type { ProgressBarProps } from '@/utils'
import { ref, computed, watch } from 'vue'

// Получаем пропсы
const props = defineProps<ProgressBarProps>()

// Радиус и окружность
const radius = 54
const circumference = computed(() => 2 * Math.PI * radius)

// Смещение для отображения прогресса
const dashOffset = ref(0)

// Управление анимацией bounce
// const bounce = ref(false)

// Стиль для сектора
// const circleStyle = computed(() => ({
//   transition: bounce.value ? 'stroke-dashoffset 0.6s ease, transform 0.3s ease' : 'none',
//   transform: bounce.value ? 'scale(1.2) ' : 'scale(1) ',
// }))

// Обновление dashOffset при изменении percentage
watch(
  () => props.percentage,
  (newVal) => {
    // Запускаем bounce
    // bounce.value = false
    // Обновляем offset
    dashOffset.value = circumference.value * (1 - newVal / 100)
    // Немного задержки, чтобы сработала анимация
    // setTimeout(() => {
    //   bounce.value = true
    // }, 1000)
  },
  { immediate: true },
)

// После окончания transition сбрасываем bounce
// const resetBounce = () => {
//   bounce.value = false
// }
</script>

<style scoped>
.progress-circle {
  display: inline-block;
  overflow: hidden;
}
</style>
