const SITE_HEADER = document.querySelector(`.header`);
const SITE_MAIN = document.querySelector(`.main`);
const SITE_FOOTER = document.querySelector(`.footer`);

const USER_RANKS = [
  {
    min: 21,
    name: `Movie buff`
  },
  {
    min: 11,
    name: `Fan`
  },
  {
    min: 1,
    name: `Novice`
  },
  {
    min: 0,
    name: ``
  }
];

const SiteFilter = {
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

const KeyboardKey = {
  ESCAPE: `Escape`,
  ESCAPE_IE: `Esc`,
  ENTER: `Enter`
};

const MouseButton = {
  MAIN: 0
};

const MovieListHeader = {
  NO_MOVIES: {
    title: `There are no movies in our database`,
    inHidden: false
  },
  LOADING: {
    title: `Loading...`,
    isHidden: false
  },
  ALL_MOVIES: {
    title: `All movies. Upcoming`,
    isHidden: true
  },
  TOP_RATED: {
    title: `Top rated`,
    isHidden: false
  },
  MOST_COMMENTED: {
    title: `Most commented`,
    isHidden: false
  }
};

const MOVIE_COUNT = 20;
const MOVIE_COUNT_PER_STEP = 5;
const MINUTES_IN_HOUR = 60;

export {SITE_HEADER, SITE_MAIN, SITE_FOOTER, USER_RANKS, SiteFilter, MOVIE_COUNT, MOVIE_COUNT_PER_STEP, MINUTES_IN_HOUR, KeyboardKey, MouseButton, MovieListHeader};
