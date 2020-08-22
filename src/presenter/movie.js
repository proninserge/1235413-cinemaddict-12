import MovieCardView from '../view/movie-card.js';
import MovieCardFullView from '../view/movie-card-full.js';
import CommentPresenter from "./comment.js";
import {render, replace, remove} from '../utils/dom.js';
import {isEscapeEvent} from '../utils/dom-event.js';

export default class Movie {
  constructor(movieContainer, changeData, closeMovieCardFull) {
    this._movieContainer = movieContainer;
    this._changeData = changeData;
    this._closeMovieCardFull = closeMovieCardFull;

    this._movieCard = null;
    this._movieCardFull = null;
    this._commentSection = null;

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
    this._handleToWatchlistClick = this._handleToWatchlistClick.bind(this);
  }

  init(movie) {
    this._movie = movie;

    const previousMovie = this._movieCard;
    const previousMovieCardFull = this._movieCardFull;

    this._movieCard = new MovieCardView(movie);
    this._movieCardFull = new MovieCardFullView(movie);

    this._movieCard.setPosterClickHandler(this._handleMovieCardClick);
    this._movieCard.setTitleClickHandler(this._handleMovieCardClick);
    this._movieCard.setCommentClickHandler(this._handleMovieCardClick);

    this._movieCard.setFavoriteClickHandler(this._handleFavoriteClick);
    this._movieCard.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._movieCard.setToWatchlistClickHandler(this._handleToWatchlistClick);

    this._movieCardFull.setFavoriteClickHandler(this._handleFavoriteClick);
    this._movieCardFull.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._movieCardFull.setToWatchlistClickHandler(this._handleToWatchlistClick);

    if (previousMovie === null || previousMovieCardFull === null) {
      render(this._movieContainer, this._movieCard);
      return;
    }

    if (this._movieContainer.getElement().contains(previousMovie.getElement())) {
      replace(this._movieCard, previousMovie);
    }

    if (document.body.contains(previousMovieCardFull.getElement())) {
      replace(this._movieCardFull, previousMovieCardFull);

      render(this._movieCardFull.getCommentSectionContainer(), this._commentSection);

      this._movieCardFull.setCloseButtonClickHandler(() => {
        this._closeFullCard();
      });
    }

    remove(previousMovie);
    remove(previousMovieCardFull);
  }

  destroy() {
    remove(this._movieCard);
    remove(this._movieCardFull);
  }

  _renderCommentSection(movie) {
    const movieCardFullCommentContainer = this._movieCardFull.getCommentSectionContainer();
    const commentPresenter = new CommentPresenter(movieCardFullCommentContainer);
    commentPresenter.init(movie);

    this._commentSection = commentPresenter.getUpToDateComments();
  }

  _renderFullCard() {
    this._closeMovieCardFull();
    render(document.body, this._movieCardFull);
    this._renderCommentSection(this._movie);
  }

  _closeFullCard() {
    remove(this._movieCardFull);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleMovieCardClick() {
    this._renderFullCard();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._movieCardFull.setCloseButtonClickHandler(() => {
      this._closeFullCard();
    });
    this._movieCardFull.setFavoriteClickHandler(this._handleFavoriteClick);
    this._movieCardFull.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._movieCardFull.setToWatchlistClickHandler(this._handleToWatchlistClick);
  }

  _escKeyDownHandler(evt) {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();
      this._closeFullCard();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._movie,
            {
              isInFavorites: !this._movie.isInFavorites
            }
        )
    );
  }

  _handleAlreadyWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._movie,
            {
              isWatched: !this._movie.isWatched
            }
        )
    );
  }

  _handleToWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._movie,
            {
              isInWatchlist: !this._movie.isInWatchlist
            }
        )
    );
  }

  resetView() {
    remove(this._movieCardFull);
  }
}
