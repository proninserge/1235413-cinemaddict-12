import SmartView from "./smart.js";

const getEmotion = (emotion) => {
  return emotion
    ? `<img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji">`
    : ``;
};

const createNewCommentTemplate = (userInput) => {
  return (
    `<div class="film-details__new-comment">
    <div for="add-emoji" class="film-details__add-emoji-label">${getEmotion(userInput.emotion)}</div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${userInput.text}</textarea>
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
      emotion: ``,
      text: ``
    };

    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._emojiListClickHandler = this._emojiListClickHandler.bind(this);
  }

  getTemplate() {
    return createNewCommentTemplate(this._data);
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      text: evt.target.value
    }, true);
  }

  _emojiListClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emotion: evt.target.value
    });
  }

  restoreHandlers() {
    const element = this.getElement();
    element.querySelector(`.film-details__comment-input`).addEventListener(`input`, this._commentInputHandler);
    element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._emojiListClickHandler);
  }
}
