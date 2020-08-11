const moviesToFilterMap = {
  all: (movies) => movies.length,
  watchlist: (movies) => movies
  .filter((movie) => movie.isInWatchlist).length,
  favorites: (movies) => movies
  .filter((movie) => movie.isInFavorites).length,
  history: (movies) => movies
  .filter((movie) => movie.isWatched).length
};

export const generateFilter = (movies) => {
  return Object.entries(moviesToFilterMap).map(([filterName, countMovies]) => {
    return {
      name: filterName,
      count: countMovies(movies),
    };
  });
};
