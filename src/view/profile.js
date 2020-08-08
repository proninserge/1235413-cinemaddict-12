import {generateFilter} from '../mock/filter.js';

export const createProfileTemplate = (movies) => {

  const filter = generateFilter(movies).filter((entry) => entry.name === `history`);
  const moviesWatched = filter[0].count;
  let rank;

  if (moviesWatched === 0) {
    rank = ``;
  } else if (moviesWatched >= 1 && moviesWatched < 11) {
    rank = `Novice`;
  } else if (moviesWatched >= 11 && moviesWatched < 21) {
    rank = `Fan`;
  } else {
    rank = `Movie Buff`;
  }


  return (
    `<section class="header__profile profile">
       <p class="profile__rating">${rank}</p>
       <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
     </section>`
  );
};
