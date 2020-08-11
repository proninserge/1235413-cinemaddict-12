import {getFilteredAmount} from '../utils/utils.js';
import {SiteFilter} from '../constants.js';

export const createMainMenuTemplate = (movies) => {
  return (
    `<nav class="main-navigation">
       <div class="main-navigation__items">
         <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
         <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${getFilteredAmount(movies, SiteFilter.WATCHLIST)}</span></a>
         <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${getFilteredAmount(movies, SiteFilter.HISTORY)}</span></a>
         <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${getFilteredAmount(movies, SiteFilter.FAVORITES)}</span></a>
       </div>
       <a href="#stats" class="main-navigation__additional">Stats</a>
     </nav>`
  );
};
