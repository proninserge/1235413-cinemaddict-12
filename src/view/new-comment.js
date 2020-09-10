import he from "he";
import SmartView from './smart';
import {isCtrlEnterEvent} from '../utils/dom-event';

const getEmotion = (emotion) => {
  return emotion !== ``
    ? createEmotionTemplate(emotion)
    : ``;
};

const createEmotionTemplate = (emotion) => `<img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji">`;

const createNewCommentTemplate = (userInput) => {
  return (
    `<div class="film-details__new-comment">
    <div for="add-emoji" class="film-details__add-emoji-label">${getEmotion(userInput.emotion)}</div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${he.encode(userInput.comment)}</textarea>
    </label>

    <div class="film-details__emoji-list">
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
      <label class="film-details__emoji-label" for="emoji-smile">
        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
      <label class="film-details__emoji-label" for="emoji-sleeping">
        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
      <label class="film-details__emoji-label" for="emoji-puke">
        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
      <label class="film-details__emoji-label" for="emoji-angry">
        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
      </label>
    </div>
  </div>`
  );
};

export default class NewComment extends SmartView {
  constructor() {
    super();

    this._data = {
      date: null,
      emotion: ``,
      comment: ``
    };

    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._emojiListClickHandler = this._emojiListClickHandler.bind(this);
    this._keydownHandler = this._keydownHandler.bind(this);
    this._commentKeydownHandler = this._commentKeydownHandler.bind(this);
  }

  getTemplate() {
    return createNewCommentTemplate(this._data);
  }

  getNew() {
    return Object.assign(
        {},
        this._data,
        {
          date: new Date().toISOString()
        }
    );
  }

  getMessageArea() {
    return this.getElement().querySelector(`.film-details__comment-input`);
  }

  setCommentKeydownHandler(callback) {
    this._callback.commentKeydown = callback;
    this.getElement().addEventListener(`keydown`, this._commentKeydownHandler);
  }

  restoreHandlers() {
    const element = this.getElement();
    element.querySelector(`.film-details__comment-input`).addEventListener(`input`, this._commentInputHandler);
    element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._emojiListClickHandler);
    element.addEventListener(`keydown`, this._commentKeydownHandler);
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      comment: evt.target.value
    }, true);
  }

  _emojiListClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emotion: evt.target.value
    });
  }

  _keydownHandler(evt, callback) {
    if (isCtrlEnterEvent(evt)) {
      callback();
    }
  }

  _commentKeydownHandler(evt) {
    this._keydownHandler(evt, this._callback.commentKeydown);
  }
}
