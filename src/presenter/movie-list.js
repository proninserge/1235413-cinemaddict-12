import {MOVIE_COUNT_PER_STEP, MovieListHeader, SortType} from '../constants.js';
import SortView from '../view/sort.js';
import MovieSectionView from '../view/movie-section.js';
import MovieListView from '../view/movie-list.js';
import MovieContainerView from '../view/movie-container.js';
import MovieCardView from '../view/movie-card.js';
import MovieCardFullView from '../view/movie-card-full.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import CommentSectionView from '../view/comment-section.js';
import CommentMessageView from '../view/comment-message.js';
import {RenderPosition, render, remove} from '../utils/dom.js';
import {sortMoviesByDate, sortMoviesByRating} from '../utils/utils.js';
import {isEscapeEvent} from '../utils/dom-event.js';

export default class MovieList {
  constructor(container) {
    this._container = container;
    this._movies = null;
    this._sourcedMovies = null;
    this._movieSection = null;
    this._movieContainer = null;
    this._movieList = null;
    this._sort = null;
    this._renderedMovieCount = MOVIE_COUNT_PER_STEP;
    this._currenSortType = SortType.DEFAULT;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
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
    const movieCard = new MovieCardView(movie);
    const movieCardFull = new MovieCardFullView(movie);
    const commentSection = new CommentSectionView(movie);

    const renderCommentSection = () => {
      const movieCardFullForm = movieCardFull.getCommentForm();
      render(movieCardFullForm, commentSection);
      const commentList = movieCardFull.getCommentList();
      movie.comments.forEach((comment) => {
        const commentMessage = new CommentMessageView(comment);
        render(commentList, commentMessage);
      });
    };

    const renderFullCard = () => {
      render(document.body, movieCardFull);
      renderCommentSection();
    };

    const closeFullCard = () => {
      remove(movieCardFull);
      remove(commentSection);
      document.removeEventListener(`keydown`, escKeyDownHandler);
    };

    const openFullCard = () => {
      renderFullCard();
      document.addEventListener(`keydown`, escKeyDownHandler);
      movieCardFull.setClickHandler(() => {
        closeFullCard();
      });
    };

    const escKeyDownHandler = (evt) => {
      if (isEscapeEvent(evt)) {
        evt.preventDefault();
        closeFullCard();
      }
    };

    movieCard.setClickHandler(() => {
      openFullCard();
    });

    render(this._movieContainer, movieCard);
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

  _clearMovieList() {
    this._movieSection.getElement().innerHTML = ``;
    remove(this._movieList);
    remove(this._movieContainer);
    this._renderedMovieCount = MOVIE_COUNT_PER_STEP;
  }

  _renderMovieList() {
    this._movieList = new MovieListView(MovieListHeader.ALL_MOVIES);
    render(this._movieSection, this._movieList);
    render(this._movieList, this._movieContainer);
    this._renderMovies(0, Math.min(this._movies.length, MOVIE_COUNT_PER_STEP));

    if (this._movies.length > this._renderedMovieCount) {
      this._renderShowMoreButton();
    }
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

  _handleSortTypeChange(sortType) {
    if (this._currenSortType === sortType) {
      return;
    }
    this._sortMovies(sortType);
    this._clearMovieList();
    this._renderMovieList();
  }

  _renderSort() {
    render(this._container, this._sort, RenderPosition.AFTERBEGIN);
    this._sort.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderSection() {
    if (this._movies.length === 0) {
      this._movieList = new MovieListView(MovieListHeader.NO_MOVIES);
      render(this._movieSection, this._movieList);
      return;
    }
    this._renderMovieList();
  }
}
