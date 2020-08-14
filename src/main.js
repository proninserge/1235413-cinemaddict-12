import {MOVIE_COUNT, MOVIE_COUNT_PER_STEP, KeyboardKey, MouseButton} from './constants.js';
import ProfileView from './view/profile.js';
import MainMenuView from './view/main-menu.js';
import SortView from './view/sort.js';
import MovieSectionView from './view/movie-section.js';
import MovieListView from './view/movie-list.js';
import NoMovieView from "./view/no-movie.js";
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

// render(siteMain, new UserStatisticsView(movies).getElement());

const renderMovie = (container, movie) => {
  const movieCard = new MovieCardView(movie);
  const movieCardFull = new MovieCardFullView(movie);
  const commentSection = new CommentSectionView(movie);
  const movieCardFullForm = movieCardFull.getElement().querySelector(`.film-details__inner`);
  render(movieCardFullForm, commentSection.getElement());
  const commentList = movieCardFullForm.querySelector(`.film-details__comments-list`);
  movie.comments.forEach((comment) => {
    const commentMessage = new CommentMessageView(comment);
    render(commentList, commentMessage.getElement());
  });

  const closeButton = movieCardFull.getElement().querySelector(`.film-details__close-btn`);

  const renderFullCard = () => {
    render(siteFooter, movieCardFull.getElement(), RenderPosition.AFTER_END);
  };

  const closeFullCard = () => {
    movieCardFull.getElement().remove();
    document.removeEventListener(`keydown`, onEscKeyDown);
    closeButton.removeEventListener(`click`, onCloseButtonClick);
  };

  const openFullCard = () => {
    renderFullCard(movie);
    document.addEventListener(`keydown`, onEscKeyDown);
    closeButton.addEventListener(`click`, onCloseButtonClick);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === KeyboardKey.ESCAPE || evt.key === KeyboardKey.ESCAPE_IE) {
      evt.preventDefault();
      closeFullCard();
    }
  };

  const onCloseButtonClick = (evt) => {
    evt.preventDefault();
    if (evt.button === MouseButton.MAIN) {
      closeFullCard();
    }
  };

  movieCard.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, (evt) => {
    if (evt.button === MouseButton.MAIN) {
      openFullCard();
    }
  });
  movieCard.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, (evt) => {
    if (evt.button === MouseButton.MAIN) {
      openFullCard();
    }
  });
  movieCard.getElement().querySelector(`.film-card__title`).addEventListener(`click`, (evt) => {
    if (evt.button === MouseButton.MAIN) {
      openFullCard();
    }
  });


  render(container, movieCard.getElement());
};

const renderMovieSection = (movieSectionContainer, allMovies) => {
  const movieSection = new MovieSectionView();
  const mainMovieList = new MovieListView();
  const movieContainer = new MovieContainerView();
  const showMoreButton = new ShowMoreButtonView();

  render(movieSectionContainer, movieSection.getElement());

  if (allMovies.length === 0) {
    render(movieSection.getElement(), new NoMovieView(allMovies).getElement());
  } else {
    render(movieSection.getElement(), mainMovieList.getElement());
    render(mainMovieList.getElement(), movieContainer.getElement());
    for (let i = 0; i < Math.min(allMovies.length, MOVIE_COUNT_PER_STEP); i++) {
      renderMovie(movieContainer.getElement(), allMovies[i]);
    }
    if (allMovies.length > MOVIE_COUNT_PER_STEP) {
      let renderedMovieCount = MOVIE_COUNT_PER_STEP;

      render(mainMovieList.getElement(), showMoreButton.getElement());
      showMoreButton.getElement().addEventListener(`click`, (evt) => {
        evt.preventDefault();
        allMovies
          .slice(renderedMovieCount, renderedMovieCount + MOVIE_COUNT_PER_STEP)
          .forEach((movie) => renderMovie(movieContainer.getElement(), movie));

        renderedMovieCount += MOVIE_COUNT_PER_STEP;

        if (renderedMovieCount >= allMovies.length) {
          showMoreButton.getElement().remove();
        }
      });
    }
  }
};

render(siteHeader, new ProfileView(movies).getElement());
render(siteMain, new MainMenuView(movies).getElement());
render(siteMain, new SortView().getElement());
renderMovieSection(siteMain, movies);
render(siteFooter, new FooterStatisticsView(movies).getElement());
