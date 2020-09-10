export default class Store {
  constructor(storage) {
    this._storage = storage;
  }

  get(key) {
    try {
      return JSON.parse(this._storage.getItem(key));
    } catch (err) {
      return {};
    }
  }

  getCommentsByMovieId(key, id) {
    const comments = this.get(key);
    return comments[id];
  }

  setItem(key, data) {
    this._storage.setItem(
        key,
        JSON.stringify(data)
    );
  }

  remove(key, id) {
    const store = this.get(key);

    delete store[id];

    this._storage.setItem(
        key,
        JSON.stringify(store)
    );
  }
}
