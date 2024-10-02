<script setup>
import { computed } from 'vue';
import { store } from '../js/store.js';

const progress = computed(() => {
  return (store.progress / store.max_progress) * 100;
});
</script>

<template>
  <div class="progress-bar-container">
    <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
    <span>{{ Math.round(progress) }}%</span>
  </div>
</template>

<style scoped>
.progress-bar-container {
  position: relative;
  width: 100%;
  height: 1.2em;
  border-radius: 10px;
  background-color: #e0e0e0;
  overflow: hidden;
}

.progress-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100%;
  background-color: #4caf50; /* Green */
  transition: width 0.3s ease;
  z-index: 0;
}

span {
  position: absolute;
  left: 49%;
  bottom: 0;
  z-index: 1;
  color: #333;
  font-weight: bold;
}
</style>
