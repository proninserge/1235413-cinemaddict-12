import {createElement} from '../utils/dom.js';

const createMovieListTemplate = (title, display = ``) => {
  return (
    `<section class="films-list">
       <h2 class="films-list__title ${display}">${title}</h2>
     </section>`
  );
};

export default class MovieList {
  constructor(title, display) {
    this._element = null;
    this._title = title;
    this._display = display;
  }

  getTemplate() {
    return createMovieListTemplate(this._title, this._display);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
