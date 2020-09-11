import {MovieCount, MovieListHeader, SortType, UpdateType, UserAction} from '../constants';
import SortView from '../view/sort';
import MovieSectionView from '../view/movie-section';
import MovieListView from '../view/movie-list';
import MovieContainerView from '../view/movie-container';
import ShowMoreButtonView from '../view/show-more-button';
import MoviePresenter from './movie';
import TopRatedPresenter from './top-rated';
import MostCommentedPresenter from './most-commented';
import {render, remove} from '../utils/dom';
import {sortMoviesByDate, sortMoviesByRating} from '../utils/sort';
import {filterTypeToMovies} from '../utils/filter';

export default class MovieList {
  constructor(container, moviesModel, filterModel, api, commentsModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._commentsModel = commentsModel;
    this._api = api;

    this._isLoading = true;

    this._movieSection = null;
    this._movieContainer = null;
    this._movieList = null;
    this._sort = null;
    this._moviePresenter = {};
    this._topRatedPresenter = null;
    this._mostCommentedPresenter = null;
    this._renderedMovieCount = MovieCount.PER_STEP;
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
    const filtredMovies = filterTypeToMovies[filterType](movies);

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

        this._api.updateMovie(update).then((response) => {
          this._moviesModel.updateMovieCard(updateType, response);
        });

        break;
    }
  }

  _handleModelEvent(updateType, updatedMovie) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._destroyExtraPresenters();
        if (this._moviePresenter[updatedMovie.id] !== undefined) {
          this._moviePresenter[updatedMovie.id].init(updatedMovie);
        }
        this._renderTopRated();
        this._renderMostCommented();
        break;
      case UpdateType.MAJOR:

        remove(this._sort);
        remove(this._movieSection);
        remove(this._movieContainer);

        this._destroyExtraPresenters();

        this._currentSortType = SortType.DEFAULT;
        this._renderSort();
        render(this._container, this._movieSection);

        this._clear();
        this._renderSection();

        break;
      case UpdateType.SUPREME:
        this._destroy();
        this._destroyExtraPresenters();

        break;
      case UpdateType.INIT:
        this._isLoading = false;

        this._clear();
        this._renderSection();

        break;
    }
  }

  _renderMovie(movie) {
    const moviePresenter = new MoviePresenter(this._movieContainer, this._handleViewAction, this._handleCardFullClose, this._moviesModel, this._commentsModel, this._api);
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
      const newRenderedMovieCount = Math.min(movieCount, this._renderedMovieCount + MovieCount.PER_STEP);
      const movies = this._getMovies().slice(this._renderedMovieCount, newRenderedMovieCount);

      this._renderMovies(movies);
      this._renderedMovieCount = newRenderedMovieCount;
      if (this._renderedMovieCount >= movieCount) {
        remove(showMoreButton);
      }
    });
  }

  _destroyExtraPresenters() {
    if (this._topRatedPresenter !== null && this._mostCommentedPresenter !== null) {
      this._topRatedPresenter.destroy();
      this._mostCommentedPresenter.destroy();
      this._topRatedPresenter = null;
      this._mostCommentedPresenter = null;
    }
  }

  _clear() {
    remove(this._movieList);
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};
    this._renderedMovieCount = MovieCount.PER_STEP;
  }

  _render() {
    this._sort.setTypeClickHandler(this._handleSortTypeClick);

    const movieCount = this._getMovies().length;
    const movies = this._getMovies().slice(0, Math.min(movieCount, MovieCount.PER_STEP));

    this._movieList = new MovieListView(MovieListHeader.ALL_MOVIES);
    render(this._movieSection, this._movieList);
    render(this._movieList, this._movieContainer);
    this._renderMovies(movies);

    if (movieCount > MovieCount.PER_STEP) {
      this._renderShowMoreButton();
    }

    this._renderTopRated();
    this._renderMostCommented();
  }

  _handleSortTypeClick(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clear();
    this._destroyExtraPresenters();
    this._render();
  }

  _renderSort() {
    render(this._container, this._sort);
  }

  _renderSection() {
    if (this._isLoading) {
      this._movieList = new MovieListView(MovieListHeader.LOADING);
      render(this._movieSection, this._movieList);
      return;
    }

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

  _renderTopRated() {
    this._topRatedPresenter = new TopRatedPresenter(this._movieSection, this._moviesModel, this._api, this._commentsModel, this._filterModel);
    this._topRatedPresenter.init();
  }

  _renderMostCommented() {
    this._mostCommentedPresenter = new MostCommentedPresenter(this._movieSection, this._moviesModel, this._api, this._commentsModel, this._filterModel);
    this._mostCommentedPresenter.init();
  }
}
