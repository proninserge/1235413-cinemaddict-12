import {MOVIE_COUNT_PER_STEP, MovieListHeader, SortType} from '../constants.js';
import SortView from '../view/sort.js';
import MovieSectionView from '../view/movie-section.js';
import MovieListView from '../view/movie-list.js';
import MovieContainerView from '../view/movie-container.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import MoviePresenter from "./movie.js";
import {RenderPosition, render, remove} from '../utils/dom.js';
import {updateItem} from "../utils/dom-update.js";
import {sortMoviesByDate, sortMoviesByRating} from '../utils/sort.js';

export default class MovieList {
  constructor(container) {
    this._container = container;
    this._movies = null;
    this._sourcedMovies = null;
    this._movieSection = null;
    this._movieContainer = null;
    this._movieList = null;
    this._sort = null;
    this._moviePresenter = {};
    this._renderedMovieCount = MOVIE_COUNT_PER_STEP;
    this._currenSortType = SortType.DEFAULT;
    this._handleSortTypeClick = this._handleSortTypeClick.bind(this);
    this._handleMovieChange = this._handleMovieChange.bind(this);
    this._handleCardFullClose = this._handleCardFullClose.bind(this);
  }

  init(movies) {
    this._movieSection = new MovieSectionView();
    this._movieContainer = new MovieContainerView();
    this._sort = new SortView();


    this._movies = movies.slice();
    this._sourcedMovies = movies.slice();
    this._renderSort();
    render(this._container, this._movieSection);
    this._renderSection();
  }

  _renderMovie(movie) {
    const moviePresenter = new MoviePresenter(this._movieContainer, this._handleMovieChange, this._handleCardFullClose);
    moviePresenter.init(movie);
    this._moviePresenter[movie.id] = moviePresenter;
  }

  _renderMovies(from, to) {
    this._movies
      .slice(from, to)
      .forEach((movie) => this._renderMovie(movie));
  }

  _renderShowMoreButton() {
    const showMoreButton = new ShowMoreButtonView();
    render(this._movieList, showMoreButton);
    showMoreButton.setClickHandler(() => {
      this._renderMovies(this._renderedMovieCount, this._renderedMovieCount + MOVIE_COUNT_PER_STEP);
      this._renderedMovieCount += MOVIE_COUNT_PER_STEP;
      if (this._renderedMovieCount >= this._movies.length) {
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
    this._movieList = new MovieListView(MovieListHeader.ALL_MOVIES);
    render(this._movieSection, this._movieList);
    render(this._movieList, this._movieContainer);
    this._renderMovies(0, Math.min(this._movies.length, MOVIE_COUNT_PER_STEP));

    if (this._movies.length > this._renderedMovieCount) {
      this._renderShowMoreButton();
    }
  }

  _handleMovieChange(updatedMovie) {
    this._movies = updateItem(this._movies, updatedMovie);
    this._sourcedMovies = updateItem(this._sourcedMovies, updatedMovie);
    this._moviePresenter[updatedMovie.id].init(updatedMovie);
  }

  _sortMovies(sortType) {
    switch (sortType) {
      case SortType.BY_DATE:
        this._movies.sort(sortMoviesByDate);
        break;
      case SortType.BY_RATING:
        this._movies.sort(sortMoviesByRating);
        break;
      default:
        this._movies = this._sourcedMovies.slice();
    }

    this._currenSortType = sortType;
  }

  _handleSortTypeClick(sortType) {
    if (this._currenSortType === sortType) {
      return;
    }
    this._sortMovies(sortType);
    this._clear();
    this._render();
  }

  _renderSort() {
    render(this._container, this._sort, RenderPosition.AFTERBEGIN);
    this._sort.setTypeClickHandler(this._handleSortTypeClick);
  }

  _renderSection() {
    if (this._movies.length === 0) {
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
