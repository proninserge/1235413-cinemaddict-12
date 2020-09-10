import {adaptToServer} from '../utils/adapters';
import {StoreSpecs} from '../constants';

const STORE_MOVIES_NAME = `${StoreSpecs.MOVIES_KEY}-${StoreSpecs.VERSION}`;
const STORE_COMMENTS_NAME = `${StoreSpecs.COMMENTS_KEY}-${StoreSpecs.VERSION}`;


const getSyncedMovies = (items) => items
  .filter(({success}) => success)
  .map(({payload}) => payload.movie);


export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    this._isSynchronized = true;
  }

  getMovies() {
    if (this._isOnLine()) {
      return this._api.getMovies()
        .then((movies) => {
          this._store.setItem(STORE_MOVIES_NAME, movies);
          return movies;
        });
    }

    const storedMovies = this._store.get(STORE_MOVIES_NAME) || [];
    this._isSynchronized = false;
    return Promise.resolve(storedMovies);
  }

  getAllComments() {
    const storedMovies = this._store.get(STORE_MOVIES_NAME) || [];
    return Promise.all(storedMovies.map((movie) => this.getComments(movie)));
  }

  getComments(movie) {
    if (this._isOnLine()) {
      return this._api.getComments(movie)
        .then((comments) => {
          const storedComments = this._store.get(STORE_COMMENTS_NAME);
          this._store.setItem(STORE_COMMENTS_NAME, Object.assign({}, storedComments, {[movie.id]: comments}));
          return comments;
        });
    }

    const storedComments = this._store.getCommentsByMovieId(STORE_COMMENTS_NAME, movie.id) || [];
    return Promise.resolve(storedComments);
  }

  updateMovie(movie) {

    if (this._isOnLine()) {
      return this._api.updateMovie(movie)
        .then((updatedMovie) => {
          this._store.setItem(STORE_MOVIES_NAME, updatedMovie);
          return updatedMovie;
        });
    }

    const localUpdatedMovie = movie;

    this._isSynchronized = false;

    const allMovies = [...this._store.get(STORE_MOVIES_NAME), Object.assign({}, localUpdatedMovie, {offline: true})];

    const allLocalMovies = allMovies.map((localMovie) => adaptToServer(localMovie));

    this._store.setItem(STORE_MOVIES_NAME, allLocalMovies);

    return Promise.resolve(localUpdatedMovie);
  }

  addComment(movie, comment) {

    if (this._isOnLine()) {
      return this._api.addComment(movie, comment)
        .then((comments) => {
          comments.forEach((updatedComment) => {
            this._storedComments.setItem(updatedComment.id, Object.assign({}, updatedComment, {movieId: movie.id}));
          });
          return comments;
        });
    }

    return Promise.reject();
  }


  deleteComment(id) {
    if (this._isOnLine()) {
      return this._api.deleteComment(id)
        .then(() => {
          this._store.remove(STORE_COMMENTS_NAME, id);
        });
    }

    return Promise.reject();
  }

  sync() {
    if (this._isOnLine()) {

      const storedMovies = this._store.get(STORE_MOVIES_NAME);

      return this._api.sync(storedMovies)
        .then((response) => {
          storedMovies
            .filter((movie) => movie.offline)
            .forEach((movie) => {
              this._store.remove(STORE_MOVIES_NAME, movie.id);
            });

          const updatedMovies = getSyncedMovies(response.updated);

          this._store.setItem(STORE_MOVIES_NAME, updatedMovies);

          this._isSynchronized = true;

          return Promise.resolve();
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  isSynchronized() {
    return this._isSynchronized;
  }

  _isOnLine() {
    return window.navigator.onLine;
  }
}
