import CommentSectionView from '../view/comment-section.js';
import CommentMessageView from '../view/comment-message.js';
import NewCommentView from '../view/new-comment.js';
import {render, remove} from '../utils/dom.js';

export default class Comment {
  constructor(commentContainer) {
    this._commentContainer = commentContainer;

    this._commentSection = null;
    this._commentMessage = null;
    this._newComment = new NewCommentView();
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

  getUpToDateComments() {
    return this._commentSection;
  }

  destroy() {
    remove(this._commentSection);
  }

  _renderComments() {
    render(this._commentContainer, this._commentSection);
    const commentList = this._commentSection.getCommentList();
    this._movie.comments.forEach((comment) => {
      this._commentMessage = new CommentMessageView(comment);
      render(commentList, this._commentMessage);
    });
    render(this._commentSection, this._newComment);

    this._newComment.setEmotionClickHandler();
    this._newComment.setCommentInputHandler();
    this._newComment.restoreHandlers();
  }
}
