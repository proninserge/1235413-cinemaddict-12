import {MOVIE_COUNT} from './constants.js';
import MainMenuView from './view/main-menu.js';
import ProfileView from './view/profile.js';
import FooterStatisticsView from './view/footer-statistics.js';
// import UserStatisticsView from './view/user-statistics.js';
import MovieListPresenter from './presenter/movie-list.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
import MoviesModel from './model/movies.js';
import {render} from './utils/dom.js';
import {generateMovie} from './mock/movie.js';

const movies = new Array(MOVIE_COUNT).fill().map(generateMovie);

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);
// render(siteMain, new UserStatisticsView(movies));

const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);

const filterModel = new FilterModel();

const movieListPresenter = new MovieListPresenter(siteMain, moviesModel, filterModel);
const filterPresenter = new FilterPresenter(siteMain, moviesModel, filterModel);

render(siteHeader, new ProfileView(moviesModel.getMovies()));
filterPresenter.init();
movieListPresenter.init();
render(siteFooter, new FooterStatisticsView(moviesModel.getMovies()));
