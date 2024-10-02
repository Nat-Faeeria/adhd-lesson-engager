import { reactive } from 'vue';

export const store = reactive({
  progress: 0,
  max_progress: 0,
  td: null,
  question_state: {},

  isClicked(questionNumber) {
    return (
      store.question_state[`${questionNumber}`] &&
      store.question_state[`${questionNumber}`].clicked
    );
  },
  isCelebrated(questionNumber) {
    return (
      store.question_state[`${questionNumber}`] &&
      store.question_state[`${questionNumber}`].celebrated
    );
  },
  toggle_clicked(questionNumber) {
    store.question_state[`${questionNumber}`].clicked = true;
  },
  toggle_celebration(questionNumber) {
    store.question_state[`${questionNumber}`].celebrated = true;
  },
  register_question(questionNumber) {
    this.question_state[`${questionNumber}`] = {
      clicked: false,
      celebrated: false,
    };
  },
  increment_progress() {
    this.progress++;
  },
  increment_max_progress() {
    this.max_progress++;
  },
  persist_state() {
    sessionStorage.setItem('state', JSON.stringify(this));
  },
  restore_state() {
    const storedState = sessionStorage.getItem('state');
    if (storedState) {
      Object.assign(this, JSON.parse(storedState));
    }
  },
  reset_state() {
    sessionStorage.removeItem('state');
    this.progress = 0;
    this.max_progress = 0;
    this.td = null;
    this.question_state = {};
  },
  has_lesson() {
    return store.td != null;
  },
});
