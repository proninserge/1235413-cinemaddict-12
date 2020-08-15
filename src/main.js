import {SITE_HEADER, SITE_MAIN, SITE_FOOTER, MOVIE_COUNT} from './constants.js';
import ProfileView from './view/profile.js';
import MainMenuView from './view/main-menu.js';
import SortView from './view/sort.js';
import FooterStatisticsView from './view/footer-statistics.js';
// import UserStatisticsView from './view/user-statistics.js';
import MovieListPresenter from "./presenter/movie-list.js";
import {render} from './utils/dom.js';
import {generateMovie} from './mock/movie.js';

const movies = new Array(MOVIE_COUNT).fill().map(generateMovie);

// render(siteMain, new UserStatisticsView(movies));

const movieListPresenter = new MovieListPresenter(SITE_MAIN);

render(SITE_HEADER, new ProfileView(movies));
render(SITE_MAIN, new MainMenuView(movies));
render(SITE_MAIN, new SortView());
movieListPresenter.init(movies);
render(SITE_FOOTER, new FooterStatisticsView(movies));
