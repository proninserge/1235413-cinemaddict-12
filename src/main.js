import ProfilePresenter from './presenter/profile';
import UserStatisticsPresenter from './presenter/user-statistics';
import FooterStatisticsPresenter from './presenter/footer-statistics';
import MovieListPresenter from './presenter/movie-list';
import FilterModel from './model/filter';
import FilterPresenter from './presenter/filter';
import MoviesModel from './model/movies';
import CommentsModel from './model/comments';
import Api from './api';
import {UpdateType} from './constants';

const AUTHORIZATION = `Basic jkso82ih7523FWiwyq63`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

const api = new Api(END_POINT, AUTHORIZATION);

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();

api.getMovies()
  .then((movies) => {
    moviesModel.set(UpdateType.INIT, movies);
  })
  .catch(() => {
    moviesModel.set(UpdateType.INIT, []);
  });

const profilePresenter = new ProfilePresenter(siteHeader, moviesModel);
const filterPresenter = new FilterPresenter(siteMain, moviesModel, filterModel);
const userStatisticsPresenter = new UserStatisticsPresenter(siteMain, moviesModel, filterModel);
const movieListPresenter = new MovieListPresenter(siteMain, moviesModel, filterModel, api, commentsModel);
const footerStatisticsPresenter = new FooterStatisticsPresenter(siteFooter, moviesModel);

profilePresenter.init();
filterPresenter.init();
userStatisticsPresenter.init();
movieListPresenter.init();
footerStatisticsPresenter.init();
