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
    this._allFilterClickHandler = this._allFilterClickHandler.bind(this);
    this._watchlistFilterClickHandler = this._watchlistFilterClickHandler.bind(this);
    this._historyFilterClickHandler = this._historyFilterClickHandler.bind(this);
    this._favoriteFilterClickHandler = this._favoriteFilterClickHandler.bind(this);
  }

  getTemplate() {
    return createMainMenuTemplate(this._movies);
  }

  markActiveFilter() {
    const element = this.getElement();
    element.querySelector(`.main-navigation__item--active`).classList.remove(`main-navigation__item--active`);
    Array.from(element.querySelectorAll(`.main-navigation__item`)).find((filter) => {
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

  _allFilterClickHandler(evt) {
    this._clickHandler(evt, this._callback.allFilterClick);
  }

  _watchlistFilterClickHandler(evt) {
    this._clickHandler(evt, this._callback.watchlistFilterClick);
  }

  _historyFilterClickHandler(evt) {
    this._clickHandler(evt, this._callback.historyFilterClick);
  }

  _favoriteFilterClickHandler(evt) {
    this._clickHandler(evt, this._callback.favoriteFilterClick);
  }

  _statsClickHandler(evt) {
    this._clickHandler(evt, this._callback.statsClick);
  }

  setAllFilterClickHandler(callback) {
    this._callback.allFilterClick = callback;
    this.getElement().querySelector(`[href="#all"]`).addEventListener(`click`, this._allFilterClickHandler);
  }

  setWatchlistFilterClickHandler(callback) {
    this._callback.watchlistFilterClick = callback;
    this.getElement().querySelector(`[href="#watchlist"]`).addEventListener(`click`, this._watchlistFilterClickHandler);
  }

  setHistoryFilterClickHandler(callback) {
    this._callback.historyFilterClick = callback;
    this.getElement().querySelector(`[href="#history"]`).addEventListener(`click`, this._historyFilterClickHandler);
  }

  setFavoriteFilterClickHandler(callback) {
    this._callback.favoriteFilterClick = callback;
    this.getElement().querySelector(`[href="#favorites"]`).addEventListener(`click`, this._favoriteFilterClickHandler);
  }

  setStatsClickHandler(callback) {
    this._callback.statsClick = callback;
    this.getElement().querySelector(`[href="#stats"]`).addEventListener(`click`, this._statsClickHandler);
  }
}
