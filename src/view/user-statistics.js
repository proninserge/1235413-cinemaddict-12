import {getDuration, getDurationInHours, getRankName} from '../utils/utils';
import SmartView from './smart';
import {USER_RANKS, MINUTES_IN_HOUR, Period} from '../constants';

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

const getAllGenres = (watchedMovies) => {
  let allGenres = [];
  for (let i = 0; i < watchedMovies.length; i++) {
    allGenres = allGenres.concat(watchedMovies[i].genres);
  }

  return allGenres
  .map((genre) => {
    return {
      count: 1,
      genre
    };
  })
  .reduce((a, b) => {
    a[b.genre] = (a[b.genre] || 0) + b.count;
    return a;
  }, {});
};

const getUniqueGenre = (watchedMovies) => {
  const frequentIndex = Math.max(...Object.values(getAllGenres(watchedMovies)));
  const favoriteGenre = Object.keys(getAllGenres(watchedMovies)).find((key) => getAllGenres(watchedMovies)[key] === frequentIndex);

  return favoriteGenre !== undefined
    ? favoriteGenre
    : ``;
};

const renderPeriodChart = (statisticCtx, movies) => {
  const allGenres = Object.keys(getAllGenres(movies));
  const watchedMoviesAmount = Object.values(getAllGenres(movies));

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: allGenres,
      datasets: [{
        data: watchedMoviesAmount,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const getDayToCompareWith = () => {
  return `${new Date().getFullYear()} ${new Date().getMonth()} ${new Date().getDate()}`;
};

const getWeekToCompareWith = () => {
  const now = new Date();
  now.setDate(now.getDate() - 6);
  return now;
};

const getMonthToCompareWith = () => {
  const now = new Date();
  now.setMonth(now.getMonth() - 1);
  return now;
};

const getYearToCompareWith = () => {
  const now = new Date();
  now.setFullYear(now.getFullYear() - 1);
  return now;
};


const createUserStatisticsTemplate = (allWatchedMovies, moviesByPeriod) => {
  const {watchedMovies, checked} = moviesByPeriod;

  const allDuration = watchedMovies.reduce(function (sum, movie) {
    return sum + movie.duration;
  }, 0);

  return (
    `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${getRankName(allWatchedMovies, USER_RANKS)}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" data-period="${Period.ALL_TIME}" ${checked === Period.ALL_TIME ? `checked` : ``}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" data-period="${Period.TODAY}" ${checked === Period.TODAY ? `checked` : ``}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" data-period="${Period.WEEK}" ${checked === Period.WEEK ? `checked` : ``}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" data-period="${Period.MONTH}" ${checked === Period.MONTH ? `checked` : ``}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" data-period="${Period.YEAR}" ${checked === Period.YEAR ? `checked` : ``}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedMovies.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${getDurationInHours(allDuration)} <span class="statistic__item-description">h</span> ${getDuration(allDuration - (getDurationInHours(allDuration) * MINUTES_IN_HOUR), false)} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${getUniqueGenre(watchedMovies)}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`
  );
};

export default class UserStatistics extends SmartView {
  constructor(movies) {
    super();

    this._movies = movies;
    this._periodChart = null;

    this._data = {
      watchedMovies: movies.filter((movie) => movie.isWatched),
      checked: Period.ALL_TIME
    };

    this._handlePeriodChange = this._handlePeriodChange.bind(this);

    this._setChart();
  }

  getTemplate() {
    return createUserStatisticsTemplate(this._movies, this._data);
  }

  removeElement() {
    super.removeElement();

    if (this._periodChart !== null) {
      this._periodChart = null;
    }
  }

  restoreHandlers() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, this._handlePeriodChange);
  }

  _setChart() {
    if (this._periodChart !== null) {
      this._periodChart = null;
    }

    const BAR_HEIGHT = 50;
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    statisticCtx.height = BAR_HEIGHT * Object.keys(getAllGenres(this._data.watchedMovies)).length;

    this._periodChart = renderPeriodChart(statisticCtx, this._data.watchedMovies);
  }

  _handlePeriodChange(evt) {
    switch (evt.target.dataset.period) {
      case Period.ALL_TIME:
        this.updateData({
          watchedMovies: this._movies.filter((movie) => movie.isWatched),
          checked: Period.ALL_TIME
        });
        this._setChart();
        break;
      case Period.TODAY:
        this.updateData({
          watchedMovies: this._movies.filter((movie) => movie.isWatched && moment(`${movie.watchingDate.getFullYear()} ${movie.watchingDate.getMonth()} ${movie.watchingDate.getDate()}`).isSame(getDayToCompareWith())),
          checked: Period.TODAY
        });
        this._setChart();
        break;
      case Period.WEEK:
        this.updateData({
          watchedMovies: this._movies.filter((movie) => movie.isWatched && moment(movie.watchingDate).isAfter(getWeekToCompareWith())),
          checked: Period.WEEK
        });
        this._setChart();
        break;
      case Period.MONTH:
        this.updateData({
          watchedMovies: this._movies.filter((movie) => movie.isWatched && moment(movie.watchingDate).isAfter(getMonthToCompareWith())),
          checked: Period.MONTH
        });
        this._setChart();
        break;
      case Period.YEAR:
        this.updateData({
          watchedMovies: this._movies.filter((movie) => movie.isWatched && moment(movie.watchingDate).isAfter(getYearToCompareWith())),
          checked: Period.YEAR
        });
        this._setChart();
        break;
    }
  }
}
