import AbstractView from './abstract';

const getHiddenAttribute = (isHidden) => {
  return isHidden
    ? `visually-hidden`
    : ``;
};

const createMovieListTemplate = (header) => {
  const {title, isHidden} = header;

  return (
    `<section class="films-list">
       <h2 class="films-list__title ${getHiddenAttribute(isHidden)}">${title}</h2>
     </section>`
  );
};

export default class MovieList extends AbstractView {
  constructor(header) {
    super();
    this._header = header;
  }

  getTemplate() {
    return createMovieListTemplate(this._header);
  }

}
