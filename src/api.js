import {Method, SuccessHTTPStatusRange} from './constants';

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getMovies() {
    return this._load({url: `movies`})
    .then(Api.toJSON)
    .then((movies) => movies.map(Api.adaptToClient));
  }

  getComments(movie) {
    return this._load({url: `comments/${movie.id}`})
    .then(Api.toJSON)
    .then((comments) => comments);
  }

  updateMovie(movie) {
    return this._load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(Api.adaptToServer(movie)),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then(Api.toJSON)
    .then(Api.adaptToClient);
  }

  addComment(movie, comment) {
    return this._load({
      url: `comments/${movie.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then(Api.toJSON)
    .then((response) => response.comments);
  }

  deleteComment(id) {
    return this._load({
      url: `comments/${id}`,
      method: Method.DELETE
    });
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }

  static adaptToClient(movie) {
    const adaptedMovie = Object.assign(
        {},
        movie,
        {
          title: movie.film_info.title,
          originalTitle: movie.film_info.alternative_title,
          director: movie.film_info.director,
          writers: movie.film_info.writers,
          actors: movie.film_info.actors,
          poster: {
            dir: movie.film_info.poster,
            get alt() {
              return movie.film_info.title;
            }
          },
          description: movie.film_info.description,
          rating: movie.film_info.total_rating,
          releaseDate: new Date(movie.film_info.release.date),
          duration: movie.film_info.runtime,
          genres: movie.film_info.genre,
          country: movie.film_info.release.release_country,
          ageRating: movie.film_info.age_rating,
          watchingDate: movie.user_details.watching_date !== null ? new Date(movie.user_details.watching_date) : null,
          isInWatchlist: movie.user_details.watchlist,
          isInFavorites: movie.user_details.favorite,
          isWatched: movie.user_details.already_watched
        }
    );

    delete adaptedMovie.film_info;
    delete adaptedMovie.user_details;

    return adaptedMovie;
  }

  static adaptToServer(movie) {
    const adaptedMovie = Object.assign(
        {},
        movie,
        {
          "film_info": {
            "title": movie.title,
            "alternative_title": movie.originalTitle,
            "total_rating": movie.rating,
            "poster": movie.poster.dir,
            "age_rating": movie.ageRating,
            "director": movie.director,
            "writers": movie.writers,
            "actors": movie.actors,
            "release": {
              "date": movie.releaseDate.toISOString(),
              "release_country": movie.country
            },
            "runtime": movie.duration,
            "genre": movie.genres,
            "description": movie.description
          },
          "user_details": {
            "watchlist": movie.isInWatchlist,
            "already_watched": movie.isWatched,
            "watching_date": movie.watchingDate !== null ? movie.watchingDate.toISOString() : null,
            "favorite": movie.isInFavorites
          }
        }
    );

    delete adaptedMovie.title;
    delete adaptedMovie.originalTitle;
    delete adaptedMovie.rating;
    delete adaptedMovie.ageRating;
    delete adaptedMovie.director;
    delete adaptedMovie.writers;
    delete adaptedMovie.actors;
    delete adaptedMovie.releaseDate;
    delete adaptedMovie.country;
    delete adaptedMovie.duration;
    delete adaptedMovie.genres;
    delete adaptedMovie.description;
    delete adaptedMovie.isInWatchlist;
    delete adaptedMovie.isWatched;
    delete adaptedMovie.watchingDate;
    delete adaptedMovie.isInFavorites;

    return adaptedMovie;
  }
}
