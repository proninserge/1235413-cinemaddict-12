import he from "he";
import {getReadableDate} from '../utils/utils';
import {isLeftMouseEvent} from '../utils/dom-event';
import {MARKED_FOR_DELETION} from '../constants';
import AbstractView from './abstract';

const createCommentMessageTemplate = (message) => {
  const {author, emotion, comment, date} = message;

  return (
    `<li class="film-details__comment" data-date="${date}">
     <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
     </span>
     <div>
       <p class="film-details__comment-text">${he.encode(comment)}</p>
       <p class="film-details__comment-info">
         <span class="film-details__comment-author">${author}</span>
         <span class="film-details__comment-day">${getReadableDate(date)}</span>
         <button class="film-details__comment-delete">Delete</button>
       </p>
     </div>
   </li>`
  );
};

export default class CommentMessage extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;

    this._clickHandler = this._clickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
  }

  getTemplate() {
    return createCommentMessageTemplate(this._comment);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, this._deleteClickHandler);
  }

  _clickHandler(evt, callback) {
    evt.preventDefault();
    if (isLeftMouseEvent(evt)) {
      evt.target.textContent = `Deleting...`;
      evt.target.disabled = true;
      this._comment.delete = true;
      this._comment.deletion = MARKED_FOR_DELETION;
      callback();
    }
  }

  _deleteClickHandler(evt) {
    this._clickHandler(evt, this._callback.deleteClick);
  }
}
