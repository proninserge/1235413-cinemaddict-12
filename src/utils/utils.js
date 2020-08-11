import {generateFilter} from '../utils/filter.js';

const getDurationInHours = (allDuration) => Math.floor(allDuration / 60);
const getRemainingMinutes = (allDuration) => Math.floor(((allDuration / 60) - getDurationInHours(allDuration)) * 60);

const getRating = (rating) => {
  return String(rating).length === 1
    ? `${rating}.0`
    : `${rating}`;
};

const getRankName = (movies, ranks) => {
  const allWatchedMovies = generateFilter(movies).filter((entry) => entry.name === `history`);
  const moviesWatchedAmount = allWatchedMovies[0].count;
  return ranks.find(({min}) => moviesWatchedAmount >= min).name;
};

const getReadableDate = (date) => {
  if (String(date).length < 2) {
    date = `0${date}`;
  }
  return `${date}`;
};

export {getDurationInHours, getRemainingMinutes, getRating, getRankName, getReadableDate};
