import MovieCardView from '../view/movie-card';
import MovieCardFullView from '../view/movie-card-full';
import CommentPresenter from './comment';
import {render, replace, remove} from '../utils/dom';
import {isEscapeEvent} from '../utils/dom-event';
import {UserAction, UpdateType} from '../constants';

export default class Movie {
  constructor(movieContainer, changeData, changeView, moviesModel, commentsModel, api) {
    this._movieContainer = movieContainer;
    this._changeData = changeData;
    this._changeView = changeView;
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._api = api;

    this._movieCard = null;
    this._movieCardFull = null;
    this._commentContainer = null;
    this._commentPresenter = null;

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleMarkAsWatchedClick = this._handleMarkAsWatchedClick.bind(this);
    this._handleAddToWatchlistClick = this._handleAddToWatchlistClick.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
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

    this._setMovieCardFullControlsClickHandlers();

    if (previousMovie === null || previousMovieCardFull === null) {
      render(this._movieContainer, this._movieCard);
      return;
    }

    if (this._movieContainer.getElement().contains(previousMovie.getElement())) {
      replace(this._movieCard, previousMovie);
    }

    if (document.body.contains(previousMovieCardFull.getElement())) {
      replace(this._movieCardFull, previousMovieCardFull);
      replace(this._commentContainer, this._movieCardFull.getCommentSectionContainer());

      this._setMovieCardFullCloseButtonClickHandler();
    }

    remove(previousMovie);
    remove(previousMovieCardFull);
  }

  destroy() {
    remove(this._movieCard);
    remove(this._movieCardFull);
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
        if (this._commentPresenter !== null) {
          this._commentPresenter.init(updatedMovie);
        }
        break;
    }
  }

  _destroyCommentPresenter() {
    if (this._commentPresenter !== null) {
      this._commentPresenter.destroy();
      this._commentPresenter = null;
      this._commentContainer = null;
    }
  }

  _setMovieCardFullControlsClickHandlers() {
    this._movieCardFull.setFavoriteClickHandler(this._handleFavoriteClick);
    this._movieCardFull.setWatchedClickHandler(this._handleMarkAsWatchedClick);
    this._movieCardFull.setWatchlistClickHandler(this._handleAddToWatchlistClick);
  }

  _setMovieCardFullCloseButtonClickHandler() {
    this._movieCardFull.setCloseButtonClickHandler(() => {
      this._closeFullCard();
    });
  }

  _renderCommentSection(movie) {
    this._commentPresenter = new CommentPresenter(this._commentContainer, this._handleViewAction, this._moviesModel, this._commentsModel, this._api);
    this._commentPresenter.init(movie);
  }

  _renderFullCard() {
    render(document.body, this._movieCardFull);
    this._commentContainer = this._movieCardFull.getCommentSectionContainer();

    this._api.getComments(this._movie)
      .then((comments) => {
        this._commentsModel.set(UpdateType.INIT, comments);
        this._renderCommentSection(this._movie);
      })
      .catch(() => {
        this._commentsModel.set(UpdateType.INIT, []);
      });
  }

  _closeFullCard() {
    this._destroyCommentPresenter();
    remove(this._movieCardFull);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleMovieCardClick() {
    this._changeView();
    this._renderFullCard();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._setMovieCardFullCloseButtonClickHandler();
    this._setMovieCardFullControlsClickHandlers();
  }

  _escKeyDownHandler(evt) {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();
      this._closeFullCard();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_MOVIE_CARD,
        UpdateType.MINOR,
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
        UserAction.UPDATE_MOVIE_CARD,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._movie,
            {
              isWatched: !this._movie.isWatched,
              watchingDate: new Date()
            }
        )
    );
  }

  _handleAddToWatchlistClick() {
    this._changeData(
        UserAction.UPDATE_MOVIE_CARD,
        UpdateType.MINOR,
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
    if (this._commentPresenter !== null) {
      this._destroyCommentPresenter();
    }
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }
}
