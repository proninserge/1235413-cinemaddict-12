import {generateFilter} from '../utils/filter.js';
import {SiteFilter, MINUTES_IN_HOUR} from '../constants.js';

const getDurationInHours = (allDuration) => Math.floor(allDuration / MINUTES_IN_HOUR);
const getRemainingMinutes = (allDuration) => Math.floor(((allDuration / MINUTES_IN_HOUR) - getDurationInHours(allDuration)) * MINUTES_IN_HOUR);

const getRating = (rating) => {
  return String(rating).length === 1
    ? `${rating}.0`
    : `${rating}`;
};

const getFilteredAmount = (allMovies, filterName) => {
  const filters = generateFilter(allMovies)
  .filter((entry) => entry.name === filterName);
  return filters[0].count;
};

const getRankName = (movies, ranks) => {
  return ranks.find(({min}) => getFilteredAmount(movies, SiteFilter.HISTORY) >= min).name;
};

const getReadableDate = (date) => {
  if (String(date).length < 2) {
    date = `0${date}`;
  }
  return `${date}`;
};

const updateItemByID = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export {getDurationInHours, getRemainingMinutes, getRating, getFilteredAmount, getRankName, getReadableDate, updateItemByID};
