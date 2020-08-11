import {MOVIE_COUNT, MOVIE_COUNT_PER_STEP} from './constants.js';
import {createProfileTemplate} from './view/profile.js';
import {createMainMenuTemplate} from './view/main-menu.js';
import {createSortTemplate} from './view/sort.js';
import {createMovieSectionTemplate} from './view/movie-section.js';
import {createMovieListTemplate} from './view/movie-list.js';
import {createMovieContainerTemplate} from './view/movie-container.js';
import {createMovieCardTemplate} from './view/movie-card.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createFooterStatisticsTemplate} from './view/footer-statistics.js';
// import {createMovieCardFullTemplate} from './view/movie-card-full.js';
// import {createCommentSectionTemplate} from './view/comment-section.js';
// import {createCommentMessageTemplate} from './view/comment-message.js';
// import {createUserStatisticsTemplate} from './view/user-statistics.js';
import {render} from './utils/dom.js';
import {generateMovie} from './mock/movie.js';

const movies = new Array(MOVIE_COUNT).fill().map(generateMovie);
// const testMovie = movies[0];

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

render(siteHeader, createProfileTemplate(movies));
render(siteMain, createMainMenuTemplate(movies));

// render(siteMain, createUserStatisticsTemplate(movies));

render(siteMain, createSortTemplate());
render(siteMain, createMovieSectionTemplate());

const movieSection = siteMain.querySelector(`.films`);
render(movieSection, createMovieListTemplate());

const mainMovieList = movieSection.querySelector(`.films-list`);
render(mainMovieList, createMovieContainerTemplate());

const movieContainer = mainMovieList.querySelector(`.films-list__container`);
for (let i = 0; i < Math.min(movies.length, MOVIE_COUNT_PER_STEP); i++) {
  render(movieContainer, createMovieCardTemplate(movies[i]));
}

if (movies.length > MOVIE_COUNT_PER_STEP) {
  let renderedMovieCount = MOVIE_COUNT_PER_STEP;

  render(mainMovieList, createShowMoreButtonTemplate());

  const showMoreButton = mainMovieList.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    movies
      .slice(renderedMovieCount, renderedMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((movie) => render(movieContainer, createMovieCardTemplate(movie)));

    renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (renderedMovieCount >= movies.length) {
      showMoreButton.remove();
    }
  });
}

/*
render(siteFooter, createMovieCardFullTemplate(testMovie), `afterend`);

const movieCardFull = document.querySelector(`.film-details`);
const movieCardFullForm = movieCardFull.querySelector(`.film-details__inner`);
render(movieCardFullForm, createCommentSectionTemplate(testMovie));

const commentList = movieCardFullForm.querySelector(`.film-details__comments-list`);
for (let i = 0; i < testMovie.comments.length; i++) {
  render(commentList, createCommentMessageTemplate(testMovie.comments[i]));
}
*/
render(siteFooter, createFooterStatisticsTemplate(movies));
