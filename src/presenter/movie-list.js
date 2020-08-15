import {SITE_FOOTER, MOVIE_COUNT_PER_STEP, KeyboardKey, MovieListHeader} from '../constants.js';
import MovieSectionView from '../view/movie-section.js';
import MovieListView from '../view/movie-list.js';
import MovieContainerView from '../view/movie-container.js';
import MovieCardView from '../view/movie-card.js';
import MovieCardFullView from '../view/movie-card-full.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import CommentSectionView from '../view/comment-section.js';
import CommentMessageView from '../view/comment-message.js';
import {RenderPosition, render, remove} from '../utils/dom.js';

export default class MovieList {
  constructor(sectionContainer) {
    this._sectionContainer = sectionContainer;
    this._movieSection = new MovieSectionView();
    this._movieContainer = new MovieContainerView();
  }

  init(movies) {
    this._movies = movies.slice();

    render(this._sectionContainer, this._movieSection);

    this._renderSection();
  }

  _renderMovie(movie) {
    const movieCard = new MovieCardView(movie);
    const movieCardFull = new MovieCardFullView(movie);
    const commentSection = new CommentSectionView(movie);
    const movieCardFullForm = movieCardFull.getElement().querySelector(`.film-details__inner`);
    render(movieCardFullForm, commentSection);
    const commentList = movieCardFullForm.querySelector(`.film-details__comments-list`);
    movie.comments.forEach((comment) => {
      const commentMessage = new CommentMessageView(comment);
      render(commentList, commentMessage);
    });

    const renderFullCard = () => {
      render(SITE_FOOTER, movieCardFull, RenderPosition.AFTER_END);
    };

    const closeFullCard = () => {
      movieCardFull.getElement().remove();
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const openFullCard = () => {
      renderFullCard(movie);
      document.addEventListener(`keydown`, onEscKeyDown);
      movieCardFull.setClickHandler(() => {
        closeFullCard();
      });
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === KeyboardKey.ESCAPE || evt.key === KeyboardKey.ESCAPE_IE) {
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
    let renderedMovieCount = MOVIE_COUNT_PER_STEP;
    const showMoreButton = new ShowMoreButtonView();
    render(this._movieList, showMoreButton);
    showMoreButton.setClickHandler(() => {
      this._renderMovies(renderedMovieCount, renderedMovieCount + MOVIE_COUNT_PER_STEP);
      renderedMovieCount += MOVIE_COUNT_PER_STEP;
      if (renderedMovieCount >= this._movies.length) {
        remove(showMoreButton);
      }
    });
  }

  _renderMovieList() {
    this._renderMovies(0, Math.min(this._movies.length, MOVIE_COUNT_PER_STEP));

    if (this._movies.length > MOVIE_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderSection() {
    if (this._movies.length === 0) {
      this._movieList = new MovieListView(MovieListHeader.NO_MOVIES);
      render(this._movieSection, this._movieList);
      return;
    }
    this._movieList = new MovieListView(MovieListHeader.ALL_MOVIES);
    render(this._movieSection, this._movieList);
    render(this._movieList, this._movieContainer);
    this._renderMovieList();
  }
}
