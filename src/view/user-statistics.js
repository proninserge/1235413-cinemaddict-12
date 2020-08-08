import {currentRank} from '../main.js';

export const createUserStatisticsTemplate = (movies) => {

  const getWatchedMovies = movies.filter((movie) => movie.isWatched);

  const allDuration = getWatchedMovies.reduce(function (sum, movie) {
    return sum + ((Number(movie.duration.hours) * 60) + Number(movie.duration.minutes));
  }, 0);
  const allDurationHours = Math.floor(allDuration / 60);
  const allDurationMinutes = Math.floor(((allDuration / 60) - allDurationHours) * 60);

  const getUniqueGenre = (watchedMovies) => {
    let allGenres = [];
    for (let i = 0; i < watchedMovies.length; i++) {
      allGenres = allGenres.concat(watchedMovies[i].genres);
    }

    let uniqueGenres = allGenres
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

    let frequentIndex = Math.max(...Object.values(uniqueGenres));
    let favoriteGenre = Object.keys(uniqueGenres).find((key) => uniqueGenres[key] === frequentIndex);

    return favoriteGenre;
  };

  return (
    `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${currentRank.textContent}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${getWatchedMovies.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${allDurationHours} <span class="statistic__item-description">h</span> ${allDurationMinutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${getUniqueGenre(getWatchedMovies)}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`
  );
};
