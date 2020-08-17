import {getRankName} from '../utils/utils.js';
import {USER_RANKS} from '../constants.js';
import AbstractView from "./abstract.js";

const createProfileTemplate = (movies) => {
  return (
    `<section class="header__profile profile">
       <p class="profile__rating">${getRankName(movies, USER_RANKS)}</p>
       <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
     </section>`
  );
};

export default class Profile extends AbstractView {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    return createProfileTemplate(this._movies);
  }

}
