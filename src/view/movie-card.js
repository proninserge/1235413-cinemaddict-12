import {getDuration, getRating} from '../utils/utils';
import {isLeftMouseEvent} from '../utils/dom-event';
import AbstractView from './abstract';
import moment from 'moment';

const GENRE_MAIN = 0;

const createMovieCardTemplate = (movie) => {
  const {title, rating, releaseDate, duration, genres, poster, description, comments, isInWatchlist, isInFavorites, isWatched} = movie;

  const releaseYear = moment(releaseDate).format(`YYYY`);

  const getActiveControl = (attribute) => {
    return attribute
      ? `film-card__controls-item--active`
      : ``;
  };

  return (
    `<article class="film-card">
       <h3 class="film-card__title">${title}</h3>
       <p class="film-card__rating">${getRating(rating)}</p>
       <p class="film-card__info">
         <span class="film-card__year">${releaseYear}</span>
         <span class="film-card__duration">${getDuration(duration)}</span>
         <span class="film-card__genre">${genres[GENRE_MAIN]}</span>
       </p>
       <img src="./${poster.dir}" alt="${poster.alt}" class="film-card__poster">
       <p class="film-card__description">${description}</p>
       <a class="film-card__comments">${comments.length} comments</a>
       <form class="film-card__controls">
         <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${getActiveControl(isInWatchlist)}">Add to watchlist</button>
         <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${getActiveControl(isWatched)}">Mark as watched</button>
         <button class="film-card__controls-item button film-card__controls-item--favorite ${getActiveControl(isInFavorites)}">Mark as favorite</button>
       </form>
     </article>`
  );
};

export default class MovieCard extends AbstractView {
  constructor(movie) {
    super();
    this._movie = movie;

    this._controlsClickHandler = this._controlsClickHandler.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this._posterClickHandler = this._posterClickHandler.bind(this);
    this._titleClickHandler = this._titleClickHandler.bind(this);
    this._commentClickHandler = this._commentClickHandler.bind(this);

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._markAsWatchedClickHandler = this._markAsWatchedClickHandler.bind(this);
    this._addToWatchlistClickHandler = this._addToWatchlistClickHandler.bind(this);
  }

  getTemplate() {
    return createMovieCardTemplate(this._movie);
  }

  _controlsClickHandler(evt, callback) {
    evt.preventDefault();
    if (isLeftMouseEvent(evt)) {
      evt.target.classList.toggle(`film-card__controls-item--active`);
      callback();
    }
  }

  _clickHandler(evt, callback) {
    evt.preventDefault();
    if (isLeftMouseEvent(evt)) {
      callback();
    }
  }

  _posterClickHandler(evt) {
    this._clickHandler(evt, this._callback.posterClick);
  }

  _titleClickHandler(evt) {
    this._clickHandler(evt, this._callback.titleClick);
  }

  _commentClickHandler(evt) {
    this._clickHandler(evt, this._callback.commentClick);
  }

  _favoriteClickHandler(evt) {
    this._controlsClickHandler(evt, this._callback.favoriteClick);
  }

  _markAsWatchedClickHandler(evt) {
    this._controlsClickHandler(evt, this._callback.markAsWatchedClick);
  }

  _addToWatchlistClickHandler(evt) {
    this._controlsClickHandler(evt, this._callback.addToWatchlistClick);
  }

  setPosterClickHandler(callback) {
    this._callback.posterClick = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._posterClickHandler);
  }

  setTitleClickHandler(callback) {
    this._callback.titleClick = callback;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._titleClickHandler);
  }

  setCommentClickHandler(callback) {
    this._callback.commentClick = callback;
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._commentClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setMarkAsWatchedClickHandler(callback) {
    this._callback.markAsWatchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._markAsWatchedClickHandler);
  }

  setAddToWatchlistClickHandler(callback) {
    this._callback.addToWatchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._addToWatchlistClickHandler);
  }
}
