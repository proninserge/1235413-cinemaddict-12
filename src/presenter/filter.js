import MainMenuView from '../view/main-menu.js';
import {render, replace, remove} from '../utils/dom.js';
import {UpdateType, FilterType} from '../constants.js';

export default class Filter {
  constructor(filterContainer, moviesModel, filterModel) {
    this._filterContainer = filterContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._currentFilter = null;

    this._filter = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleAllClick = this._handleAllClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const previousFilter = this._filter;
    this._currentFilter = this._filterModel.getFilter();

    this._filter = new MainMenuView(this._moviesModel.getMovies(), this._currentFilter);
    this._filter.markActiveFilter();

    this._filter.setAllFilterClickHandler(this._handleAllClick);
    this._filter.setWatchlistFilterClickHandler(this._handleWatchlistClick);
    this._filter.setHistoryFilterClickHandler(this._handleHistoryClick);
    this._filter.setFavoriteFilterClickHandler(this._handleFavoriteClick);

    if (previousFilter === null) {
      render(this._filterContainer, this._filter);
      return;
    }

    replace(this._filter, previousFilter);
    remove(previousFilter);
  }

  _handleAllClick() {
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
  }

  _handleWatchlistClick() {
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.WATCHLIST);
  }

  _handleHistoryClick() {
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.HISTORY);
  }

  _handleFavoriteClick() {
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.FAVORITES);
  }

  _handleModelEvent() {
    this.init();
  }
}