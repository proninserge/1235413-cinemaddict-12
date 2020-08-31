import {MOVIE_COUNT_PER_STEP, MovieListHeader, SortType, UpdateType, UserAction} from '../constants.js';
import SortView from '../view/sort.js';
import MovieSectionView from '../view/movie-section.js';
import MovieListView from '../view/movie-list.js';
import MovieContainerView from '../view/movie-container.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import MoviePresenter from "./movie.js";
import {RenderPosition, render, remove} from '../utils/dom.js';
import {sortMoviesByDate, sortMoviesByRating} from '../utils/sort.js';
import {filter} from '../utils/filter.js';

export default class MovieList {
  constructor(container, moviesModel, filterModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;

    this._movieSection = null;
    this._movieContainer = null;
    this._movieList = null;
    this._sort = null;
    this._moviePresenter = {};
    this._renderedMovieCount = MOVIE_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._handleSortTypeClick = this._handleSortTypeClick.bind(this);
    this._handleCardFullClose = this._handleCardFullClose.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._movieSection = new MovieSectionView();
    this._movieContainer = new MovieContainerView();
    this._sort = new SortView();

    this._renderSort();
    render(this._container, this._movieSection);
    this._renderSection();
  }

  _destroy() {
    this._clear();

    remove(this._sort);
    remove(this._movieSection);
    remove(this._movieContainer);
  }

  _getMovies() {
    const filterType = this._filterModel.get();
    const movies = this._moviesModel.get();
    const filtredMovies = filter[filterType](movies);

    switch (this._currentSortType) {
      case SortType.BY_DATE:
        return filtredMovies.slice().sort(sortMoviesByDate);
      case SortType.BY_RATING:
        return filtredMovies.slice().sort(sortMoviesByRating);
      default:
        return filtredMovies;
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE_CARD:
        this._moviesModel.updateMovieCard(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, updatedMovie) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._moviePresenter[updatedMovie.id].init(updatedMovie);
        break;
      case UpdateType.MAJOR:

        remove(this._sort);
        remove(this._movieSection);
        remove(this._movieContainer);

        this._currentSortType = SortType.DEFAULT;
        this._renderSort();
        render(this._container, this._movieSection);

        this._clear();
        this._render();

        break;
      case UpdateType.SUPREME:

        this._destroy();

        break;
    }
  }

  _renderMovie(movie) {
    const moviePresenter = new MoviePresenter(this._movieContainer, this._handleViewAction, this._handleCardFullClose, this._moviesModel);
    moviePresenter.init(movie);
    this._moviePresenter[movie.id] = moviePresenter;
  }

  _renderMovies(movies) {
    movies.forEach((movie) => this._renderMovie(movie));
  }

  _renderShowMoreButton() {
    const movieCount = this._getMovies().length;

    const showMoreButton = new ShowMoreButtonView();
    render(this._movieList, showMoreButton);
    showMoreButton.setClickHandler(() => {
      const newRenderedMovieCount = Math.min(movieCount, this._renderedMovieCount + MOVIE_COUNT_PER_STEP);
      const movies = this._getMovies().slice(this._renderedMovieCount, newRenderedMovieCount);

      this._renderMovies(movies);
      this._renderedMovieCount = newRenderedMovieCount;
      if (this._renderedMovieCount >= movieCount) {
        remove(showMoreButton);
      }
    });
  }

  _clear() {
    remove(this._movieList);
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};
    this._renderedMovieCount = MOVIE_COUNT_PER_STEP;
  }

  _render() {
    const movieCount = this._getMovies().length;
    const movies = this._getMovies().slice(0, Math.min(movieCount, MOVIE_COUNT_PER_STEP));

    this._movieList = new MovieListView(MovieListHeader.ALL_MOVIES);
    render(this._movieSection, this._movieList);
    render(this._movieList, this._movieContainer);
    this._renderMovies(movies);

    if (movieCount > MOVIE_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _handleSortTypeClick(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clear();
    this._render();
  }

  _renderSort() {
    render(this._container, this._sort, RenderPosition.AFTERBEGIN);
    this._sort.setTypeClickHandler(this._handleSortTypeClick);
  }

  _renderSection() {
    if (this._getMovies().length === 0) {
      this._movieList = new MovieListView(MovieListHeader.NO_MOVIES);
      render(this._movieSection, this._movieList);
      return;
    }
    this._render();
  }

  _handleCardFullClose() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.resetView());
  }
}
