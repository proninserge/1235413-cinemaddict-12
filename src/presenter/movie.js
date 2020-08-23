import MovieCardView from '../view/movie-card.js';
import MovieCardFullView from '../view/movie-card-full.js';
import CommentPresenter from "./comment.js";
import {render, replace, remove} from '../utils/dom.js';
import {isEscapeEvent} from '../utils/dom-event.js';

export default class Movie {
  constructor(movieContainer, changeData, closeAll) {
    this._movieContainer = movieContainer.getElement();
    this._changeData = changeData;
    this._closeAll = closeAll;

    this._movieCard = null;
    this._movieCardFull = null;
    this._commentContainer = null;
    this._commentPresenter = {};

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleMarkAsWatchedClick = this._handleMarkAsWatchedClick.bind(this);
    this._handleAddToWatchlistClick = this._handleAddToWatchlistClick.bind(this);
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
    this._movieCard.setMarkAsWatchedClickHandler(this._handleMarkAsWatchedClick);
    this._movieCard.setAddToWatchlistClickHandler(this._handleAddToWatchlistClick);

    this._movieCardFull.setFavoriteClickHandler(this._handleFavoriteClick);
    this._movieCardFull.setWatchedClickHandler(this._handleMarkAsWatchedClick);
    this._movieCardFull.setWatchlistClickHandler(this._handleAddToWatchlistClick);

    const previousCommentContainer = this._movieCardFull.getCommentSectionContainer();

    if (previousMovie === null || previousMovieCardFull === null) {
      render(this._movieContainer, this._movieCard);
      return;
    }

    if (this._movieContainer.contains(previousMovie.getElement())) {
      replace(this._movieCard, previousMovie);
    }

    if (document.body.contains(previousMovieCardFull.getElement())) {
      replace(this._movieCardFull, previousMovieCardFull);
      replace(this._commentContainer, previousCommentContainer);

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
    this._commentPresenter = new CommentPresenter(this._commentContainer);
    this._commentPresenter.init(movie);
  }

  _renderFullCard() {
    this._closeAll();
    render(document.body, this._movieCardFull);
    this._commentContainer = this._movieCardFull.getCommentSectionContainer();
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
    this._movieCardFull.setWatchedClickHandler(this._handleMarkAsWatchedClick);
    this._movieCardFull.setWatchlistClickHandler(this._handleAddToWatchlistClick);
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

  _handleMarkAsWatchedClick() {
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

  _handleAddToWatchlistClick() {
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
