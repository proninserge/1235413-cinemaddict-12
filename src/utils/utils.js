import {generateFilter} from '../utils/filter.js';
import {FilterType} from '../constants.js';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

const formatDate = (format) => {
  return format ? `H[h] mm[m]` : `H mm`;
};

const getDuration = (allDuration, format = true) => moment.duration(allDuration, `minutes`).format(formatDate(format));

const getDurationInHours = (allDuration) => moment.duration(allDuration, `minutes`).format(`H`,
    {
      trunc: true,
      trim: `both`
    }
);

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
  return ranks.find(({min}) => getFilteredAmount(movies, FilterType.HISTORY) >= min).name;
};

const getReadableDate = (date) => {
  return moment(date, `YYYY/MM/DD H:mm`).fromNow();
};

export {getDuration, getDurationInHours, getRating, getFilteredAmount, getRankName, getReadableDate};
