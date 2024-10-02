<script setup>
import DragUpload from './components/DragUpload.vue';
import CardFactory from './components/CardFactory.vue';
import ProgressBar from './components/ProgressBar.vue';
import { parser } from './js/parser.js';
import { store } from './js/store.js';
import { ref } from 'vue';

store.restore_state();

let display_drop = ref(true);
let json_data = ref();
let markdown_data = ref();

if (store.has_lesson()) {
  json_data.value = store.td;
  display_drop.value = false;
}
const handleJsonFileDrop = (droppedFile) => {
  json_data.value = droppedFile;
  store.td = json_data.value;
  display_drop.value = false;
  store.persist_state();
};

const handleMarkdownFileDrop = (droppedFile) => {
  display_drop.value = false;
  markdown_data.value = droppedFile;
};

const reset_state = () => {
  store.reset_state();
  json_data.value = null;
  display_drop.value = true;
};

const downloadFile = () => {
  const url = parser.createJsonFile(markdown_data.value);
  const tempLink = document.createElement('a');
  tempLink.href = url;
  tempLink.download = parser.file_name + '.json';
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  display_drop.value = true;
};
</script>

<template>
  <header>
    <h1>TD-AH</h1>
  </header>
  <DragUpload
    v-if="display_drop"
    @json-dropped="handleJsonFileDrop"
    @markdown-dropped="handleMarkdownFileDrop"
  />
  <button v-if="!display_drop" class="danger" @click="reset_state()">
    Reset
  </button>
  <div v-if="json_data">
    <h2>{{ json_data.td_name }}</h2>
    <CardFactory :items="json_data.items" />
    <ProgressBar />
  </div>
  <div v-if="markdown_data">
    <button @click="downloadFile">Télécharger le cours au format JSON</button>
  </div>
</template>

<style scoped>
.danger {
  background-color: red;
  color: white;
  font-weight: bold;
}
</style>
