import {getRandomInteger} from '../utils/utils.js';

const DescriptionLength = {
  MIN: 1,
  MAX: 5
};

const GenresAmount = {
  MIN: 1,
  MAX: 3
};

const WritersNumber = {
  MIN: 1,
  MAX: 3
};

const ActorsNumber = {
  MIN: 1,
  MAX: 5
};

const generateReleaseDate = () => {
  const randomDate = new Date(getRandomInteger(1895, 2020), getRandomInteger(0, 11), getRandomInteger(1, 31));
  return {
    get day() {
      let day = randomDate.getDate();
      if (String(day).length < 2) {
        day = `0${day}`;
      }
      return `${day}`;
    },
    month: `${randomDate.toLocaleString(`en-US`, {month: `long`})}`,
    year: `${randomDate.getFullYear()}`
  };
};

const generateTitle = () => {
  const titles = [
    `From Crib to Coffin`,
    `Edge of the World`,
    `Civil Wars`,
    `L'Arrivée d'un train en gare de la Ciotat`
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateDirector = () => {
  const directors = [
    `Anthony Mann`,
    `John Doe`,
    `Jane Doe`,
    `Michel Ardant`
  ];

  const randomIndex = getRandomInteger(0, directors.length - 1);

  return directors[randomIndex];
};

const generateWriters = () => {
  const writers = [
    `John Doe`,
    `Jane Doe`,
    `Sir Arthur Conan Doyle`,
    `Ernest Hemingway`,
    `Jules Verne`,
    `Unknown`
  ];

  const randomWritersNumber = getRandomInteger(WritersNumber.MIN, WritersNumber.MAX);
  let allWriters = [];
  for (let i = 0; i < randomWritersNumber; i++) {
    let randomIndex = getRandomInteger(0, writers.length - 1);
    allWriters.push(writers[randomIndex]);
  }
  allWriters = new Set(allWriters);
  allWriters = [...allWriters];
  return allWriters.join(`, `);
};

const generateActors = () => {
  const actors = [
    `John Doe`,
    `Jane Doe`,
    `Danila Kozlovsky`,
    `Alex Petrov`,
    `Weird Al Yankovic`,
    `Nate Fillion`
  ];

  const randomActorsNumber = getRandomInteger(ActorsNumber.MIN, ActorsNumber.MAX);
  let allActors = [];
  for (let i = 0; i < randomActorsNumber; i++) {
    let randomIndex = getRandomInteger(0, actors.length - 1);
    allActors.push(actors[randomIndex]);
  }
  allActors = new Set(allActors);
  allActors = [...allActors].join(`, `);
  return allActors;
};

const generatePoster = () => {
  const posters = [
    `sagebrush-trail.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateDescription = () => {
  const description = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  const randomSentenceNumber = getRandomInteger(DescriptionLength.MIN, DescriptionLength.MAX);
  let fullDescription = [];
  for (let i = 0; i < randomSentenceNumber; i++) {
    let randomIndex = getRandomInteger(0, description.length - 1);
    fullDescription.push(description[randomIndex]);
  }
  fullDescription = new Set(fullDescription);
  fullDescription = [...fullDescription].join(` `);
  return fullDescription;
};

const generateRating = () => {
  return `${getRandomInteger(0, 9)}.${getRandomInteger(0, 9)}`;
};

const generateDuration = () => {
  return {
    hours: `${getRandomInteger(1, 2)}`,
    minutes: `${getRandomInteger(0, 5)}${getRandomInteger(0, 9)}`
  };
};

const generateGenres = () => {
  const genres = [
    `Mystery`,
    `Drama`,
    `Comedy`,
    `Cartoon`,
    `Musical`,
    `Western`
  ];

  const randomGenresNumber = getRandomInteger(GenresAmount.MIN, GenresAmount.MAX);
  let allGenres = [];
  for (let i = 0; i < randomGenresNumber; i++) {
    let randomIndex = getRandomInteger(0, genres.length - 1);
    allGenres.push(genres[randomIndex]);
  }
  allGenres = new Set(allGenres);
  allGenres = [...allGenres];
  return allGenres;
};

const generateCountry = () => {
  const countries = [
    `USA`,
    `Brasil`,
    `The Netherlands`,
    `France`,
    `Thailand`
  ];

  const randomIndex = getRandomInteger(0, countries.length - 1);

  return countries[randomIndex];
};

const generateAgeRating = () => {
  const ageRating = [`0+`, `6+`, `12+`, `16+`, `18+`];

  const randomIndex = getRandomInteger(0, ageRating.length - 1);

  return ageRating[randomIndex];
};

export const generateMovie = () => {
  return {
    title: generateTitle(),
    get originalTitle() {
      return this.title;
    },
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    poster: generatePoster(),
    description: generateDescription(),
    rating: generateRating(),
    releaseDate: generateReleaseDate(),
    get releaseYear() {
      return this.releaseDate.year;
    },
    duration: generateDuration(),
    genres: generateGenres(),
    country: generateCountry(),
    ageRating: generateAgeRating(),
    isInWatchlist: Boolean(getRandomInteger(0, 1)),
    isInFavorites: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1))
  };
};
