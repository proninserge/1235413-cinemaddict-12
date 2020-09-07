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

  updateCommentSection(update) {
    this._comments = [
      ...this._comments.slice(),
      update
    ];
  }

  deleteComment(id) {
    const index = this._comments.findIndex((comment) => id === comment.id);
    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1)
    ];
  }
}
