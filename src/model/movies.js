import Observer from '../utils/observer';

export default class Movies extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  set(updateType, movies) {
    this._movies = movies.slice();

    this._notify(updateType);
  }

  get() {
    return this._movies;
  }

  updateMovieCard(updateType, update) {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting movie`);
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1)
    ];

    this._notify(updateType, update);
  }
}
