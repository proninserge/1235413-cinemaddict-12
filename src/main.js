const MOVIE_COUNT = 5;

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
// import {createUserStatisticsTemplate} from './view/user-statistics.js';
import {render} from './utils/dom.js';

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

render(siteHeader, createProfileTemplate());
render(siteMain, createMainMenuTemplate());
render(siteMain, createSortTemplate());
render(siteMain, createMovieSectionTemplate());

const movieSection = siteMain.querySelector(`.films`);
render(movieSection, createMovieListTemplate());

const mainMovieList = movieSection.querySelector(`.films-list`);
render(mainMovieList, createMovieContainerTemplate());

const movieContainer = mainMovieList.querySelector(`.films-list__container`);
for (let i = 0; i < MOVIE_COUNT; i++) {
  render(movieContainer, createMovieCardTemplate());
}

render(mainMovieList, createShowMoreButtonTemplate());

render(siteFooter, createFooterStatisticsTemplate());
