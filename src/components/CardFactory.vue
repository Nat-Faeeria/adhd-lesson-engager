<script setup>
import TaskCard from './TaskCard.vue';
import ContentCard from './ContentCard.vue';

defineProps({
  items: Object,
});

const componentsMap = {
  ContentCard,
  TaskCard,
};
const isOfType = (type) => {
  return componentsMap[type];
};
</script>

<template>
  <div v-for="item in items">
    <component :is="isOfType(item.type)" v-bind="item.props"></component>
  </div>
</template>
