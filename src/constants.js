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

const Period = {
  ALL_TIME: `ALL_TIME`,
  TODAY: `TODAY`,
  WEEK: `WEEK`,
  MONTH: `MONTH`,
  YEAR: `YEAR`
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

const MOVIE_COUNT_PER_STEP = 5;

const MARKED_FOR_DELETION = `for_deletion`;

const MINUTES_IN_HOUR = 60;

const SortType = {
  DEFAULT: `default`,
  BY_DATE: `by-date`,
  BY_RATING: `by-rating`
};

const UserAction = {
  UPDATE_MOVIELIST: `UPDATE_LIST`,
  UPDATE_MOVIE_CARD: `UPDATE_CARD`,
  ADD_COMMENT: `ADD_COMMENT`,
  DELETE_COMMENT: `DELETE_COMMENT`
};

const UpdateType = {
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  SUPREME: `SUPREME`,
  INIT: `INIT`
};

const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
  STATS: `noFilter`
};

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

const SymbolCount = {
  MIN: 0,
  MAX: 140
};

const SHAKE_TIMEOUT = 600;

const ERROR_COLOR = `red`;

const StoreSpecs = {
  MOVIES_KEY: `cinemaddict-movies-localstorage`,
  COMMENTS_KEY: `cinemaddict-comments-localstorage`,
  VERSION: `v1.0`
};

export {
  USER_RANKS,
  MOVIE_COUNT_PER_STEP,
  MARKED_FOR_DELETION,
  MINUTES_IN_HOUR,
  Period,
  KeyboardKey,
  MouseButton,
  MovieListHeader,
  SortType,
  UserAction,
  UpdateType,
  FilterType,
  Method,
  SuccessHTTPStatusRange,
  SymbolCount,
  SHAKE_TIMEOUT,
  ERROR_COLOR,
  StoreSpecs
};
