<script setup>
import CheckButton from './CheckButton.vue';
import { store } from '../js/store.js';

defineProps({
  content: String,
  questionNumber: Number,
});

store.increment_max_progress();
</script>

<template>
  <div class="card">
    {{ questionNumber }}
    <CheckButton :questionNumber="questionNumber" />
    <div class="content">{{ content }}</div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 1%;
  margin: 1% 0;
}
.content {
  width: 85%;
}
</style>
