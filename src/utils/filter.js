import {FilterType} from '../constants';

const moviesToFilterMap = {
  all: (movies) => movies.length,
  watchlist: (movies) => movies
  .filter((movie) => movie.isInWatchlist).length,
  favorites: (movies) => movies
  .filter((movie) => movie.isInFavorites).length,
  history: (movies) => movies
  .filter((movie) => movie.isWatched).length
};

const filter = {
  [FilterType.ALL]: (movies) => movies,
  [FilterType.WATCHLIST]: (movies) => movies
  .filter((movie) => movie.isInWatchlist),
  [FilterType.FAVORITES]: (movies) => movies
  .filter((movie) => movie.isInFavorites),
  [FilterType.HISTORY]: (movies) => movies
  .filter((movie) => movie.isWatched)
};

const generateFilter = (movies) => {
  return Object.entries(moviesToFilterMap).map(([filterName, countMovies]) => {
    return {
      name: filterName,
      count: countMovies(movies),
    };
  });
};

export {generateFilter, filter};
