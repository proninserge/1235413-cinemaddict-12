import {MOVIE_COUNT} from './constants.js';
import ProfilePresenter from './presenter/profile.js';
import FooterStatisticsPresenter from './presenter/footer-statistics.js';
// import UserStatisticsView from './view/user-statistics.js';
import MovieListPresenter from './presenter/movie-list.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
import MoviesModel from './model/movies.js';
import {generateMovie} from './mock/movie.js';

const movies = new Array(MOVIE_COUNT).fill().map(generateMovie);

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);
// render(siteMain, new UserStatisticsView(movies));

const moviesModel = new MoviesModel();
moviesModel.set(movies);

const filterModel = new FilterModel();

const profilePresenter = new ProfilePresenter(siteHeader, moviesModel);
const movieListPresenter = new MovieListPresenter(siteMain, moviesModel, filterModel);
const filterPresenter = new FilterPresenter(siteMain, moviesModel, filterModel);
const footerStatisticsPresenter = new FooterStatisticsPresenter(siteFooter, moviesModel);

profilePresenter.init();
filterPresenter.init();
movieListPresenter.init();
footerStatisticsPresenter.init();
