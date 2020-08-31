import {getDuration, getDurationInHours, getRankName} from '../utils/utils.js';
import SmartView from "./smart.js";
import {USER_RANKS, MINUTES_IN_HOUR} from '../constants.js';

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
  let frequentIndex = Math.max(...Object.values(getAllGenres(watchedMovies)));
  let favoriteGenre = Object.keys(getAllGenres(watchedMovies)).find((key) => getAllGenres(watchedMovies)[key] === frequentIndex);

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

const createUserStatisticsTemplate = (data) => {

  const allDuration = data.reduce(function (sum, movie) {
    return sum + movie.duration;
  }, 0);

  return (
    `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${getRankName(data, USER_RANKS)}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" data-period="ALL_TIME" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" data-period="TODAY">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" data-period="WEEK">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" data-period="MONTH">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" data-period="YEAR">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${data.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${getDurationInHours(allDuration)} <span class="statistic__item-description">h</span> ${getDuration(allDuration - (getDurationInHours(allDuration) * MINUTES_IN_HOUR), false)} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${getUniqueGenre(data)}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`
  );
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

export default class UserStatistics extends SmartView {
  constructor(movies) {
    super();

    this._allMovies = movies.filter((movie) => movie.isWatched);
    this._moviesToday = movies.filter((movie) => moment(movie.watchingDate).isSame(new Date()));
    this._moviesByWeek = movies.filter((movie) => moment(movie.watchingDate).isAfter(getWeekToCompareWith()));
    this._moviesByMonth = movies.filter((movie) => moment(movie.watchingDate).isAfter(getMonthToCompareWith()));
    this._moviesByYear = movies.filter((movie) => moment(movie.watchingDate).isAfter(getYearToCompareWith()));

    this._periodChart = null;

    this._data = {
      allWatchedMovies: this._allMovies
    };

    this._handlePeriodChange = this._handlePeriodChange.bind(this);

    this._setChart();
  }

  getTemplate() {
    return createUserStatisticsTemplate(this._data.allWatchedMovies);
  }

  _setChart() {
    if (this._periodChart !== null) {
      this._periodChart = null;
    }

    const BAR_HEIGHT = 50;
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    statisticCtx.height = BAR_HEIGHT * this._allMovies.length;

    this._periodChart = renderPeriodChart(statisticCtx, this._data.allWatchedMovies);
  }

  _handlePeriodChange(evt) {
    evt.target.checked = true;
    switch (evt.target.dataset.period) {
      case `ALL_TIME`:
        this.updateData({
          allWatchedMovies: this._allMovies
        });
        this._setChart();
        break;
      case `TODAY`:
        this.updateData({
          allWatchedMovies: this._moviesToday
        });
        this._setChart();
        break;
      case `WEEK`:
        this.updateData({
          allWatchedMovies: this._moviesByWeek
        });
        this._setChart();
        break;
      case `MONTH`:
        this.updateData({
          allWatchedMovies: this._moviesByMonth
        });
        this._setChart();
        break;
      case `YEAR`:
        this.updateData({
          allWatchedMovies: this._moviesByYear
        });
        this._setChart();
        break;
    }
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
}
