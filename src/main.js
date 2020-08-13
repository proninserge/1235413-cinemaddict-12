import {MOVIE_COUNT, MOVIE_COUNT_PER_STEP, Keys} from './constants.js';
import ProfileView from './view/profile.js';
import MainMenuView from './view/main-menu.js';
import SortView from './view/sort.js';
import MovieSectionView from './view/movie-section.js';
import MovieListView from './view/movie-list.js';
import MovieContainerView from './view/movie-container.js';
import MovieCardView from './view/movie-card.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FooterStatisticsView from './view/footer-statistics.js';
import MovieCardFullView from './view/movie-card-full.js';
import CommentSectionView from './view/comment-section.js';
import CommentMessageView from './view/comment-message.js';
// import UserStatisticsView from './view/user-statistics.js';
import {RenderPosition, render} from './utils/dom.js';
import {generateMovie} from './mock/movie.js';

const movies = new Array(MOVIE_COUNT).fill().map(generateMovie);

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

render(siteHeader, new ProfileView(movies).getElement());
render(siteMain, new MainMenuView(movies).getElement());

// render(siteMain, new UserStatisticsView(movies).getElement());

const sort = new SortView();
const movieSection = new MovieSectionView();
const mainMovieList = new MovieListView();
const movieContainer = new MovieContainerView();
const showMoreButton = new ShowMoreButtonView();
render(siteMain, sort.getElement());
render(siteMain, movieSection.getElement());
render(movieSection.getElement(), mainMovieList.getElement());
render(mainMovieList.getElement(), movieContainer.getElement());

const renderMovie = (container, movie) => {
  const movieCard = new MovieCardView(movie);
  const movieCardFull = new MovieCardFullView(movie);
  const commentSection = new CommentSectionView(movie);
  const movieCardFullForm = movieCardFull.getElement().querySelector(`.film-details__inner`);
  render(movieCardFullForm, commentSection.getElement());
  const commentList = movieCardFullForm.querySelector(`.film-details__comments-list`);
  for (let i = 0; i < movie.comments.length; i++) {
    const commentMessage = new CommentMessageView(movie.comments[i]);
    render(commentList, commentMessage.getElement());
  }
  const closeButton = movieCardFull.getElement().querySelector(`.film-details__close-btn`);

  const renderFullCard = () => {
    render(siteFooter, movieCardFull.getElement(), RenderPosition.AFTEREND);
  };

  const onEscKeyDown = (evt) => {
    if (evt.keyCode === Keys.ESC_KEYCODE) {
      evt.preventDefault();
      movieCardFull.getElement().remove();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onCloseBtnClick = (evt) => {
    evt.preventDefault();
    if (evt.which === Keys.LEFT_KEY) {
      movieCardFull.getElement().remove();
      closeButton.removeEventListener(`click`, onCloseBtnClick);
    }
  };

  movieCard.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    renderFullCard(movie);
    document.addEventListener(`keydown`, onEscKeyDown);
    closeButton.addEventListener(`click`, onCloseBtnClick);
  });
  movieCard.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
    renderFullCard(movie);
    document.addEventListener(`keydown`, onEscKeyDown);
    closeButton.addEventListener(`click`, onCloseBtnClick);
  });
  movieCard.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
    renderFullCard(movie);
    document.addEventListener(`keydown`, onEscKeyDown);
    closeButton.addEventListener(`click`, onCloseBtnClick);
  });


  render(container, movieCard.getElement());
};

for (let i = 0; i < Math.min(movies.length, MOVIE_COUNT_PER_STEP); i++) {
  renderMovie(movieContainer.getElement(), movies[i]);
}

if (movies.length > MOVIE_COUNT_PER_STEP) {
  let renderedMovieCount = MOVIE_COUNT_PER_STEP;

  render(mainMovieList.getElement(), showMoreButton.getElement());
  showMoreButton.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    movies
      .slice(renderedMovieCount, renderedMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((movie) => renderMovie(movieContainer.getElement(), movie));

    renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (renderedMovieCount >= movies.length) {
      showMoreButton.getElement().remove();
    }
  });
}

render(siteFooter, new FooterStatisticsView(movies).getElement());
