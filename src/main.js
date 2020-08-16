import {MOVIE_COUNT} from './constants.js';
import ProfileView from './view/profile.js';
import MainMenuView from './view/main-menu.js';
import FooterStatisticsView from './view/footer-statistics.js';
// import UserStatisticsView from './view/user-statistics.js';
import MovieListPresenter from "./presenter/movie-list.js";
import {render} from './utils/dom.js';
import {generateMovie} from './mock/movie.js';

const movies = new Array(MOVIE_COUNT).fill().map(generateMovie);

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);
// render(siteMain, new UserStatisticsView(movies));

const movieListPresenter = new MovieListPresenter(siteMain);

render(siteHeader, new ProfileView(movies));
render(siteMain, new MainMenuView(movies));
movieListPresenter.init(movies);
render(siteFooter, new FooterStatisticsView(movies));
