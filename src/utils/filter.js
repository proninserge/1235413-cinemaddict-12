import {FilterType} from '../constants';

const filterTypeToMovies = {
  [FilterType.ALL]: (movies) => movies,
  [FilterType.WATCHLIST]: (movies) => movies
  .filter((movie) => movie.isInWatchlist),
  [FilterType.FAVORITES]: (movies) => movies
  .filter((movie) => movie.isInFavorites),
  [FilterType.HISTORY]: (movies) => movies
  .filter((movie) => movie.isWatched)
};

const generateFilter = (movies) => {
  return Object.entries(filterTypeToMovies).map(([filterName, countMovies]) => {
    return {
      name: filterName,
      count: countMovies(movies).length,
    };
  });
};

export {generateFilter, filterTypeToMovies};
