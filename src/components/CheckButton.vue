<script setup>
import { reactive, onMounted } from 'vue';
import { store } from '../js/store.js';
import { confettis } from '../js/confettis.js';

const props = defineProps({
  questionNumber: Number,
});

const questionNumber = props.questionNumber;

onMounted(() => {
  try {
    store.question_state[`${props.questionNumber}`].clicked;
  } catch (error) {
    store.register_question(props.questionNumber);
  }
});

const toggle = () => {
  if (!store.isClicked(props.questionNumber)) {
    store.toggle_clicked(props.questionNumber);
    store.increment_progress();
    store.persist_state();
  }
};

const celebrate = () => {
  if (!store.isCelebrated(props.questionNumber)) {
    confettis.show_confettis();
    store.toggle_celebration(props.questionNumber);
    store.persist_state();
  }
};

const click = () => {
  toggle();
  celebrate();
};

//TODO: add correction mode
</script>

<template>
  <button
    type="button"
    v-bind:class="{
      unclicked_button: !store.isClicked(props.questionNumber),
      clicked_button: store.isClicked(props.questionNumber),
    }"
    @click="click()"
  ></button>
</template>

<style scoped>
button {
  border-radius: 100%;
  height: 40px;
  width: 40px;
  font-size: 1.3em;
  padding: 0;
}

button:after {
  content: '\2713';
}

.unclicked_button {
  background-color: white;
  color: grey;
  border: 1px dotted grey;
}

.clicked_button {
  background-color: #5cb85c;
  color: white;
}
</style>
