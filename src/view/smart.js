import AbstractView from './abstract';

export default class Smart extends AbstractView {
  constructor() {
    super();
    this._data = {};
  }

  updateData(update, justDataUpdating = false) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
        {},
        this._data,
        update
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let previousElement = this.getElement();
    this.removeElement();

    const newElement = this.getElement();

    previousElement.replaceWith(newElement);
    previousElement = null;

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }
}
