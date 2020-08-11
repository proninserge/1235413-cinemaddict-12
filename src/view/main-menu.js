import {generateFilter} from '../utils/filter.js';

export const createMainMenuTemplate = (movies) => {

  const getFilteredAmount = (allMovies, filterName) => {
    const filters = generateFilter(allMovies)
    .filter((entry) => entry.name === filterName);
    return filters[0].count;
  };

  return (
    `<nav class="main-navigation">
       <div class="main-navigation__items">
         <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
         <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${getFilteredAmount(movies, `watchlist`)}</span></a>
         <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${getFilteredAmount(movies, `history`)}</span></a>
         <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${getFilteredAmount(movies, `favorites`)}</span></a>
       </div>
       <a href="#stats" class="main-navigation__additional">Stats</a>
     </nav>`
  );
};
