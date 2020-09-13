const sortMoviesByDate = (movieA, movieB) => {
  return movieB.releaseDate - movieA.releaseDate;
};

const sortMoviesByRating = (movieA, movieB) => {
  return movieB.rating - movieA.rating;
};

const sortMoviesByComments = (movieA, movieB) => {
  return movieB.comments.length - movieA.comments.length;
};


export {sortMoviesByDate, sortMoviesByRating, sortMoviesByComments};
