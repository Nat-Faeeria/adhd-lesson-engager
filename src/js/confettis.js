//confetti settings
const scalar = 2.5;

const shapes = {
  checkmark: confetti.shapeFromText({ text: '✅', scalar }),
  thumbs_up: confetti.shapeFromText({ text: '👍', scalar }),
  perfect: confetti.shapeFromText({ text: '👌', scalar }),
  amazing: confetti.shapeFromText({ text: '🤩', scalar }),
  clap: confetti.shapeFromText({ text: '👏', scalar }),
  medium_clap: confetti.shapeFromText({ text: '👏🏽', scalar }),
  dark_clap: confetti.shapeFromText({ text: '👏🏿', scalar }),
  hundred: confetti.shapeFromText({ text: '💯', scalar }),
  strong: confetti.shapeFromText({ text: '💪', scalar }),
  medium_strong: confetti.shapeFromText({ text: '💪🏽', scalar }),
  dark_strong: confetti.shapeFromText({ text: '💪🏿', scalar }),
  party: confetti.shapeFromText({ text: '🥳', scalar }),
  light_man_hero: confetti.shapeFromText({ text: '🦸🏻‍♂️', scalar }),
  medium_man_hero: confetti.shapeFromText({ text: '🦸🏽‍♂️', scalar }),
  dark_man_hero: confetti.shapeFromText({ text: '🦸🏿‍♂️', scalar }),
  light_woman_hero: confetti.shapeFromText({ text: '🦸🏻‍♀️', scalar }),
  medium_woman_hero: confetti.shapeFromText({ text: '🦸🏽‍♀️', scalar }),
  dark_woman_hero: confetti.shapeFromText({ text: '🦸🏿‍♀️', scalar }),
};

const randomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

const randomIntInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const randomDistinctInRange = (min, max, alreadySelected) => {
  let number = -1;
  while (number === -1 || alreadySelected.includes(number)) {
    number = randomIntInRange(min, max);
  }
  return number;
};

const randomShapes = (numberOfShapes = 2) => {
  let keys = Object.keys(shapes);
  if (numberOfShapes <= keys.length) {
    let indexes = [];
    let selectedShapes = [];
    while (indexes.length < numberOfShapes) {
      indexes.push(randomDistinctInRange(0, keys.length, indexes));
    }
    console.log(indexes);
    for (let value of indexes) {
      console.log('value : ' + value);
      selectedShapes.push(shapes[keys[value]]);
    }
    return selectedShapes;
  }
  return shapes.checkmark;
};

const confetti_settings = {
  spread: 360,
  ticks: 180,
  gravity: 0.5,
  decay: 0.95,
  startVelocity: 15,
  scalar,
};

export const confettis = {
  show_confettis() {
    confetti({
      ...confetti_settings,
      angle: randomInRange(30, 150),
      spread: randomInRange(50, 200),
      particleCount: randomInRange(30, 60),
      origin: { x: randomInRange(0.2, 0.8), y: randomInRange(0.7, 0.9) },
      shapes: randomShapes(2),
      spread: 160,
    });
  },
};
