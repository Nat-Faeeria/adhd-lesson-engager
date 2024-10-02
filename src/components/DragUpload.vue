<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { parser } from '../js/parser.js';

const emit = defineEmits(['json-dropped', 'markdown-dropped']);

let active = ref(false);
let wrong_type = ref(false);
let inActiveTimeout = null;
let dropped = false;

function setActive() {
  active.value = true;
  clearTimeout(inActiveTimeout);
}
function setInactive() {
  inActiveTimeout = setTimeout(() => {
    active.value = false;
  }, 50);
}

function isMarkdown(file) {
  return file.type === 'text/markdown' || file.name.endsWith('.md');
}

function onDrop(e) {
  setInactive();

  const file = [...e.dataTransfer.files][0];
  if (file.type === 'application/json' || isMarkdown(file)) {
    wrong_type.value = false;
    const reader = new FileReader();
    try {
      reader.onload = async (event) => {
        const content = event.target.result;
        if (file.type === 'application/json') {
          try {
            const jsonData = JSON.parse(content);
            dropped = true;
            emit('json-dropped', jsonData);
          } catch (error) {
            console.error('Error parsing JSON:', error);
            this.$emit('json-parse-error', error);
          }
        } else if (isMarkdown(file)) {
          try {
            const markdownData = parser.parseMarkdown(content);
            dropped = true;
            emit('markdown-dropped', markdownData);
          } catch (error) {
            console.error('Error parsing markdown:', error);
            this.$emit('markdown-parse-error', error);
          }
        }
      };

      reader.onerror = (error) => {
        console.error('File reading error:', error);
        emit('file-read-error', error);
      };

      reader.readAsText(file);
    } catch (error) {
      console.error('Error reading file:', error);
      emit('file-read-error', error);
    }
  } else {
    console.log(file);
    wrong_type.value = true;
  }
}

function preventDefaults(e) {
  e.preventDefault();
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop'];

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults);
  });
});

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults);
  });
});
</script>

<template>
  <div
    v-bind:class="{
      drop_container: true,
      hide: dropped,
    }"
    :data-active="active"
    @dragenter.prevent="setActive"
    @dragover.prevent="setActive"
    @dragleave.prevent="setInactive"
    @drop.prevent="onDrop"
  >
    <div class="slot" :dropZoneActive="active">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M12 1.25a.75.75 0 0 1 .57.262l3 3.5a.75.75 0 1 1-1.14.976l-1.68-1.96V15a.75.75 0 0 1-1.5 0V4.027L9.57 5.988a.75.75 0 1 1-1.14-.976l3-3.5A.75.75 0 0 1 12 1.25M6.996 8.252a.75.75 0 0 1 .008 1.5c-1.093.006-1.868.034-2.457.142c-.566.105-.895.272-1.138.515c-.277.277-.457.666-.556 1.4c-.101.755-.103 1.756-.103 3.191v1c0 1.436.002 2.437.103 3.192c.099.734.28 1.122.556 1.4c.277.276.665.456 1.4.555c.754.102 1.756.103 3.191.103h8c1.435 0 2.436-.001 3.192-.103c.734-.099 1.122-.279 1.399-.556s.457-.665.556-1.399c.101-.755.103-1.756.103-3.192v-1c0-1.435-.002-2.436-.103-3.192c-.099-.733-.28-1.122-.556-1.399c-.244-.243-.572-.41-1.138-.515c-.589-.108-1.364-.136-2.457-.142a.75.75 0 1 1 .008-1.5c1.082.006 1.983.032 2.72.167c.758.14 1.403.405 1.928.93c.602.601.86 1.36.982 2.26c.116.866.116 1.969.116 3.336v1.11c0 1.368 0 2.47-.116 3.337c-.122.9-.38 1.658-.982 2.26s-1.36.86-2.26.982c-.867.116-1.97.116-3.337.116h-8.11c-1.367 0-2.47 0-3.337-.116c-.9-.121-1.658-.38-2.26-.982s-.86-1.36-.981-2.26c-.117-.867-.117-1.97-.117-3.337v-1.11c0-1.367 0-2.47.117-3.337c.12-.9.38-1.658.981-2.26c.525-.524 1.17-.79 1.928-.929c.737-.135 1.638-.161 2.72-.167"
          clip-rule="evenodd"
        />
      </svg>
      <span>Téléversez un fichier</span>
    </div>
    <div :wrong_type="wrong_type">
      Mauvais format de fichier, réessayez avec un type correct
    </div>
  </div>
</template>

<style scoped>
.drop_container {
  height: 10em;
  width: 50%;
  margin-left: 25%;
  border-radius: 20px;
  border: 1px solid grey;
}

/*.hide {
  display: none;
}*/

.slot {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}

[data-active='true'] {
  background-color: #f2f2f2;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

/* When data-active is false or not set */
[data-active='false'],
[data-active]:not([data-active='true']) {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 15px 30px -6px inset,
    rgba(0, 0, 0, 0.3) 0px 9px 16px -9px inset;
}

svg {
  display: block;
  height: 60%;
  width: 60%;
  margin-left: 20%;
}

[data-active='true'] svg {
  color: black;
}

[data-active='false'] svg,
[data-active]:not([data-active='true']) svg {
  color: grey;
}

[wrong_type='true'] {
  color: red;
}

[wrong_type='false'],
[wrong_type]:not([wrong_type='true']) {
  display: none;
}
</style>
