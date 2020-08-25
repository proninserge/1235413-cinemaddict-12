import CommentSectionView from '../view/comment-section.js';
import CommentMessageView from '../view/comment-message.js';
import NewCommentView from '../view/new-comment.js';
import {render, remove} from '../utils/dom.js';

export default class Comment {
  constructor(commentContainer) {
    this._commentContainer = commentContainer;

    this._commentSection = null;
    this._newComment = null;
    this._renderComments = this._renderComments.bind(this);
  }

  init(movie) {
    this._movie = movie;

    const previousCommentSection = this._commentSection;
    this._commentSection = new CommentSectionView(this._movie);

    if (previousCommentSection === null) {
      this._renderComments();
      return;
    }

    if (this._commentContainer.getElement().contains(previousCommentSection.getElement())) {
      remove(previousCommentSection);
      this._renderComments();
    }
  }

  destroy() {
    this._commentContainer = null;
    remove(this._commentSection);
    remove(this._newComment);
  }

  _renderComments() {
    render(this._commentContainer, this._commentSection);
    const commentList = this._commentSection.getCommentList();
    this._movie.comments.forEach((comment) => {
      render(commentList, new CommentMessageView(comment));
    });
    this._newComment = new NewCommentView();
    render(this._commentSection, this._newComment);

    this._newComment.restoreHandlers();
  }
}
