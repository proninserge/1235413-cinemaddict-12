import {getRandomInteger} from '../utils/utils.js';

const generateAuthor = () => {
  const authors = [
    `Spongebob`,
    `Nick Valentine`,
    `Marie Lucie Lueftmann`,
    `Acid Power`,
    `Mike Oxsmaul`
  ];

  const randomIndex = getRandomInteger(0, authors.length - 1);

  return authors[randomIndex];
};

const generateEmotion = () => {
  const emotions = [
    `smile`,
    `sleeping`,
    `puke`,
    `angry`
  ];

  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};

const generateText = () => {
  const texts = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`
  ];

  const randomIndex = getRandomInteger(0, texts.length - 1);

  return texts[randomIndex];
};

const generateDate = () => {
  const randomDate = new Date(getRandomInteger(2018, 2020), getRandomInteger(0, 11), getRandomInteger(1, 31), getRandomInteger(0, 23), getRandomInteger(0, 59));
  const date = {
    year: `${randomDate.getFullYear()}`,
    get month() {
      let month = randomDate.getMonth() + 1;
      if (String(month).length < 2) {
        month = `0${month}`;
      }
      return `${month}`;
    },
    get day() {
      let day = randomDate.getDate();
      if (String(day).length < 2) {
        day = `0${day}`;
      }
      return `${day}`;
    },
    get time() {
      return `${randomDate.getHours()}:${randomDate.getMinutes()}`;
    }
  };
  const commentDate = `${date.year}/${date.month}/${date.day} ${date.time}`;
  return commentDate;
};

export const generateComment = () => {
  return {
    author: generateAuthor(),
    emotion: generateEmotion(),
    text: generateText(),
    date: generateDate()
  };
};
