import {createElement} from '../utils/dom.js';

const createMovieSectionTemplate = () => {
  return (
    `<section class="films">
     </section>`
  );
};

export default class MovieSection {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMovieSectionTemplate();
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
