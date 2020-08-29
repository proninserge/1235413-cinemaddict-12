import {getFilteredAmount} from '../utils/utils.js';
import {isLeftMouseEvent} from '../utils/dom-event.js';
import {FilterType} from '../constants.js';
import AbstractView from "./abstract.js";

const createMainMenuTemplate = (movies) => {
  return (
    `<nav class="main-navigation">
       <div class="main-navigation__items">
         <a href="#all" class="main-navigation__item main-navigation__item--active" data-filter="${FilterType.ALL}">All movies</a>
         <a href="#watchlist" class="main-navigation__item" data-filter="${FilterType.WATCHLIST}">Watchlist <span class="main-navigation__item-count">${getFilteredAmount(movies, FilterType.WATCHLIST)}</span></a>
         <a href="#history" class="main-navigation__item" data-filter="${FilterType.HISTORY}">History <span class="main-navigation__item-count">${getFilteredAmount(movies, FilterType.HISTORY)}</span></a>
         <a href="#favorites" class="main-navigation__item" data-filter="${FilterType.FAVORITES}">Favorites <span class="main-navigation__item-count">${getFilteredAmount(movies, FilterType.FAVORITES)}</span></a>
       </div>
       <a href="#stats" class="main-navigation__additional">Stats</a>
     </nav>`
  );
};

export default class MainMenu extends AbstractView {
  constructor(movies, currentFilter) {
    super();
    this._movies = movies;
    this._currentFilter = currentFilter;

    this._clickHandler = this._clickHandler.bind(this);
    this._allClickHandler = this._allClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createMainMenuTemplate(this._movies);
  }

  markActiveFilter() {
    const element = this.getElement();
    element.querySelector(`.main-navigation__item--active`).classList.remove(`main-navigation__item--active`);
    element.querySelectorAll(`.main-navigation__item`).forEach((filter) => {
      if (filter.dataset.filter === this._currentFilter) {
        filter.classList.add(`main-navigation__item--active`);
      }
    });
  }

  _clickHandler(evt, callback) {
    evt.preventDefault();
    if (isLeftMouseEvent(evt)) {
      callback();
    }
  }

  _allClickHandler(evt) {
    this._clickHandler(evt, this._callback.allClick);
  }

  _watchlistClickHandler(evt) {
    this._clickHandler(evt, this._callback.watchlistClick);
  }

  _historyClickHandler(evt) {
    this._clickHandler(evt, this._callback.historyClick);
  }

  _favoriteClickHandler(evt) {
    this._clickHandler(evt, this._callback.favoriteClick);
  }

  _statsClickHandler(evt) {
    this._clickHandler(evt, this._callback.statsClick);
  }

  setAllClickHandler(callback) {
    this._callback.allClick = callback;
    this.getElement().querySelector(`[href="#all"]`).addEventListener(`click`, this._allClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`[href="#watchlist"]`).addEventListener(`click`, this._watchlistClickHandler);
  }

  setHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this.getElement().querySelector(`[href="#history"]`).addEventListener(`click`, this._historyClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`[href="#favorites"]`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setStatsClickHandler(callback) {
    this._callback.statsClick = callback;
    this.getElement().querySelector(`[href="#stats"]`).addEventListener(`click`, this._statsClickHandler);
  }
}
