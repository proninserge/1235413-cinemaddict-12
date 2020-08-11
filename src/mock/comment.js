import {getRandomInteger} from '../mock/random.js';

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
  return new Date(getRandomInteger(2017, 2020), getRandomInteger(0, 11), getRandomInteger(1, 31), getRandomInteger(0, 23), getRandomInteger(0, 59));
};

export const generateComment = () => {
  return {
    author: generateAuthor(),
    emotion: generateEmotion(),
    text: generateText(),
    date: generateDate()
  };
};
