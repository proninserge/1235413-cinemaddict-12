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

const Keys = {
  LEFT_KEY: 1,
  ESC_KEYCODE: 27,
  ENTER_KEYCODE: 13
};

const MOVIE_COUNT = 20;
const MOVIE_COUNT_PER_STEP = 5;
const MINUTES_IN_HOUR = 60;

export {USER_RANKS, SiteFilter, MOVIE_COUNT, MOVIE_COUNT_PER_STEP, MINUTES_IN_HOUR, Keys};
