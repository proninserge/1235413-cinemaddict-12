import {MovieCount, MovieListHeader, UpdateType, UserAction} from '../constants';
import MovieListView from '../view/movie-list';
import MovieContainerView from '../view/movie-container';
import MoviePresenter from './movie';
import {sortMoviesByComments} from '../utils/sort';
import {render, remove} from '../utils/dom';

export default class MostCommented {
  constructor(container, moviesModel, api, commentsModel, filterModel) {
    this._container = container;
    this._api = api;
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._filterModel = filterModel;

    this._movieContainer = null;
    this._movieList = null;
    this._moviePresenter = {};
    this._handleCardFullClose = this._handleCardFullClose.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    if (this._getMovies().length !== 0) {
      this._movieContainer = new MovieContainerView();
      this._movieList = new MovieListView(MovieListHeader.MOST_COMMENTED);

      render(this._container, this._movieList);
      render(this._movieList, this._movieContainer);
      this._renderSection();
    }
  }

  _getMovies() {
    const allMovies = this._moviesModel.get().slice();
    const withComments = allMovies.filter((movie) => movie.comments.length !== 0);
    return withComments.sort(sortMoviesByComments);
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
        if (this._moviePresenter[updatedMovie.id] !== undefined) {
          this._moviePresenter[updatedMovie.id].init(updatedMovie);
        }
        break;
    }
  }

  _renderMovie(movie) {
    const moviePresenter = new MoviePresenter(this._movieContainer, this._handleViewAction, this._handleCardFullClose, this._moviesModel, this._commentsModel, this._api);
    moviePresenter.init(movie);
    this._moviePresenter[movie.id] = moviePresenter;
  }

  _renderMovies(movies) {
    movies
    .slice(MovieCount.EXTRA_MIN, MovieCount.EXTRA_MAX)
    .forEach((movie) => this._renderMovie(movie));
  }

  destroy() {
    if (this._movieList !== null && this._movieContainer !== null) {
      remove(this._movieList);
      remove(this._movieContainer);
    }
  }

  _renderSection() {
    const movies = this._getMovies().slice();
    this._renderMovies(movies);
  }

  _handleCardFullClose() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.resetView());
  }
}
