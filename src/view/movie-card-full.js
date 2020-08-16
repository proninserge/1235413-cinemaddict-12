import {getDurationInHours, getRemainingMinutes, getRating, getReadableDate} from '../utils/utils.js';
import {MouseButton} from '../constants.js';
import AbstractView from "./abstract.js";

const getGenre = (genres) => {
  return genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(` `);
};

const getGenresCount = (genres) => {
  return genres.length === 1
    ? `Genre`
    : `Genres`;
};

const createMovieCardFullTemplate = (movie) => {
  const day = getReadableDate(movie.releaseDate.getDate());
  const month = movie.releaseDate.toLocaleString(`en-US`, {month: `long`});
  const year = movie.releaseDate.getFullYear();

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${movie.poster.dir}" alt="${movie.poster.alt}">

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
                <td class="film-details__cell">${day} ${month} ${year}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${getDurationInHours(movie.duration)}h ${getRemainingMinutes(movie.duration)}m</td>
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
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>


    </form>
  </section>`
  );
};

export default class MovieCardFull extends AbstractView {
  constructor(movie) {
    super();
    this._movie = movie;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createMovieCardFullTemplate(this._movie);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    if (evt.button === MouseButton.MAIN) {
      this._callback.click();
    }
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
  }

  getCommentForm() {
    return this.getElement().querySelector(`.film-details__inner`);
  }

  getCommentList() {
    return this.getElement().querySelector(`.film-details__comments-list`);
  }

}
