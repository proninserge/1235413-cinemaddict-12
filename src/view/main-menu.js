import {generateFilter} from '../mock/filter.js';

export const createMainMenuTemplate = (movies) => {

  const getFilteredNumber = (movieList, filterName) => {
    const filter = generateFilter(movieList)
    .filter((entry) => entry.name === filterName);
    return filter[0].count;
  };

  return (
    `<nav class="main-navigation">
       <div class="main-navigation__items">
         <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
         <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${getFilteredNumber(movies, `watchlist`)}</span></a>
         <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${getFilteredNumber(movies, `history`)}</span></a>
         <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${getFilteredNumber(movies, `favorites`)}</span></a>
       </div>
       <a href="#stats" class="main-navigation__additional">Stats</a>
     </nav>`
  );
};
