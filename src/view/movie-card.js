import {getDurationInHours, getRemainingMinutes, getRating} from '../utils/utils.js';
import {MouseButton} from '../constants.js';
import AbstractView from "./abstract.js";

const GENRE_MAIN = 0;

const createMovieCardTemplate = (movie) => {
  const {title, rating, releaseDate, duration, genres, poster, description, comments, isInWatchlist, isInFavorites, isWatched} = movie;

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
         <span class="film-card__year">${releaseDate.getFullYear()}</span>
         <span class="film-card__duration">${getDurationInHours(duration)}h ${getRemainingMinutes(duration)}m</span>
         <span class="film-card__genre">${genres[GENRE_MAIN]}</span>
       </p>
       <img src="${poster.dir}" alt="${poster.alt}" class="film-card__poster">
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
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createMovieCardTemplate(this._movie);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    if (evt.button === MouseButton.MAIN) {
      this._callback.click();
    }
  }

  setClickHandler(callback) {
    this._element = this.getElement();
    this._callback.click = callback;
    this._element.querySelector(`.film-card__poster`).addEventListener(`click`, this._clickHandler);
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._clickHandler);
    this._element.querySelector(`.film-card__title`).addEventListener(`click`, this._clickHandler);
  }

}
