import {getDuration, getRating} from '../utils/utils';
import {isLeftMouseEvent} from '../utils/dom-event';
import AbstractView from './abstract';
import moment from 'moment';

const getGenre = (genres) => {
  return genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(` `);
};

const getGenresCount = (genres) => {
  return genres.length === 1 || genres.length === 0
    ? `Genre`
    : `Genres`;
};

const getControl = (control) => {
  return control
    ? `checked`
    : ``;
};

const getReleaseDate = (date) => moment(date).format(`DD MMMM YYYY`);

const createMovieCardFullTemplate = (movie) => {
  const {releaseDate, isInWatchlist, isInFavorites, isWatched} = movie;

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./${movie.poster.dir}" alt="${movie.poster.alt}">

            <p class="film-details__age">${movie.ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${movie.title}</h3>
                <p class="film-details__title-original">Original: ${movie.originalTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${getRating(movie.rating)}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${movie.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${movie.writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${movie.actors.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${getReleaseDate(releaseDate)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${getDuration(movie.duration)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${movie.country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${getGenresCount(movie.genres)}</td>
                <td class="film-details__cell">
                ${getGenre(movie.genres)}
              </tr>
            </table>

            <p class="film-details__film-description">
              ${movie.description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${getControl(isInWatchlist)}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${getControl(isWatched)}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${getControl(isInFavorites)}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="form-details__bottom-container">
      </div>
    </form>
  </section>`
  );
};

export default class MovieCardFull extends AbstractView {
  constructor(movie) {
    super();
    this._movie = movie;
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);

    this._controlsClickHandler = this._controlsClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
  }

  getTemplate() {
    return createMovieCardFullTemplate(this._movie);
  }

  setCloseButtonClickHandler(callback) {
    this._callback.closeButtonClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeButtonClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  getCommentSectionContainer() {
    return this.getElement().querySelector(`.form-details__bottom-container`);
  }

  _controlsClickHandler(evt, callback) {
    evt.preventDefault();
    if (isLeftMouseEvent(evt)) {
      callback();
    }
  }

  _closeButtonClickHandler(evt) {
    evt.preventDefault();
    if (isLeftMouseEvent(evt)) {
      this._callback.closeButtonClick();
    }
  }

  _favoriteClickHandler(evt) {
    this._controlsClickHandler(evt, this._callback.favoriteClick);
  }

  _watchedClickHandler(evt) {
    this._controlsClickHandler(evt, this._callback.watchedClick);
  }

  _watchlistClickHandler(evt) {
    this._controlsClickHandler(evt, this._callback.watchlistClick);
  }
}
