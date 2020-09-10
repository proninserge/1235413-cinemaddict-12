import AbstractView from './abstract';
import {SortType} from '../constants';

const createSortTemplate = () => {
  return (
    `<ul class="sort">
       <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
       <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_DATE}">Sort by date</a></li>
       <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_RATING}">Sort by rating</a></li>
     </ul>`
  );
};

export default class Sort extends AbstractView {
  constructor() {
    super();
    this._typeClickHandler = this._typeClickHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  setTypeClickHandler(callback) {
    this._callback.typeChange = callback;
    this.getElement().addEventListener(`click`, this._typeClickHandler);
  }

  _typeClickHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    this.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
    evt.preventDefault();
    evt.target.classList.add(`sort__button--active`);
    this._callback.typeChange(evt.target.dataset.sortType);
  }
}
