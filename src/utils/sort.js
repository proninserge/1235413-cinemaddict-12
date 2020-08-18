const sortMoviesByDate = (movieA, movieB) => {
  return movieB.releaseDate - movieA.releaseDate;
};

const sortMoviesByRating = (movieA, movieB) => {
  return movieB.rating - movieA.rating;
};

export {sortMoviesByDate, sortMoviesByRating};
