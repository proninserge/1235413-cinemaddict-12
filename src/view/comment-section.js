import AbstractView from "./abstract.js";

const createCommentSectionTemplate = (movie) => {
  return (
    `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${movie.comments.length}</span></h3>

    <ul class="film-details__comments-list">
    </ul>


    </section>`
  );
};

export default class CommentSection extends AbstractView {
  constructor(movie) {
    super();
    this._movie = movie;
  }

  getTemplate() {
    return createCommentSectionTemplate(this._movie);
  }

  getCommentList() {
    return this.getElement().querySelector(`.film-details__comments-list`);
  }
}
