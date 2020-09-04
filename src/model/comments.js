import Observer from '../utils/observer';

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  set(updateType, comments) {
    this._comments = comments;

    this._notify(updateType);
  }

  get() {
    return this._comments;
  }

  updateCommentSection(updateType, update) {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting comment`);
    }

    this._comments = [
      ...this._comments.slice(0, index),
      update,
      ...this._comments.slice(index + 1)
    ];

    this._notify(updateType, update);
  }
}
