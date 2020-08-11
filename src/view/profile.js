import {getRankName} from '../utils/utils.js';
import {USER_RANK} from '../constants.js';

export const createProfileTemplate = (movies) => {
  return (
    `<section class="header__profile profile">
       <p class="profile__rating">${getRankName(movies, USER_RANK)}</p>
       <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
     </section>`
  );
};
