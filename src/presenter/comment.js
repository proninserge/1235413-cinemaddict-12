import CommentSectionView from '../view/comment-section.js';
import CommentMessageView from '../view/comment-message.js';
import NewCommentView from '../view/new-comment.js';
import {render, remove} from '../utils/dom.js';
import {UserAction, UpdateType} from '../constants.js';

export default class Comment {
  constructor(commentContainer, changeData, moviesModel) {
    this._commentContainer = commentContainer;
    this._changeData = changeData;
    this._moviesModel = moviesModel;

    this._movie = null;
    this._commentSection = null;
    this._commentMessage = null;
    this._newComment = null;
    this._renderComments = this._renderComments.bind(this);

    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleCommentSubmit = this._handleCommentSubmit.bind(this);
  }

  init(movie) {
    this._movie = movie;

    const previousCommentSection = this._commentSection;
    this._commentSection = new CommentSectionView(this._movie);

    if (previousCommentSection === null) {
      this._renderComments();
      return;
    }

    if (this._commentContainer.contains(previousCommentSection.getElement())) {
      remove(previousCommentSection);
      this._renderComments();
    }
  }

  destroy() {
    this._commentContainer = null;
    remove(this._commentSection);
    if (this.commentMessage !== undefined) {
      remove(this.commentMessage);
    }
    remove(this._newComment);
  }

  _renderComments() {
    render(this._commentContainer, this._commentSection);
    const commentList = this._commentSection.getCommentList();

    if (this._movie.comments.length !== 0) {
      this._movie.comments.forEach((comment) => {
        this.commentMessage = new CommentMessageView(comment);
        render(commentList, this.commentMessage);
        this.commentMessage.setCommentDeleteClickHandler(this._handleDeleteClick);
      });
    }

    this._newComment = new NewCommentView();
    render(this._commentSection, this._newComment);

    this._newComment.setCommentSubmitHandler(this._handleCommentSubmit);
    this._newComment.restoreHandlers();
  }

  _getUpdateAfterAddition() {
    return this._newComment.getNewComment().emotion !== `` && this._newComment.getNewComment().text !== ``
      ? Object.assign(
          {},
          this._movie,
          {
            comments: [
              ...this._movie.comments.slice(),
              this._newComment.getNewComment()
            ]
          }
      )
      : this._movie;
  }

  _getUpdateAfterDeletion() {
    const commentIndex = this._movie.comments.findIndex((comment) => comment.delete === true);
    return Object.assign(
        {},
        this._movie,
        {
          comments: [
            ...this._movie.comments.slice(0, commentIndex),
            ...this._movie.comments.slice(commentIndex + 1)
          ]
        }
    );
  }

  _handleCommentSubmit() {
    this._changeData(
        UserAction.UPDATE_MOVIE_CARD,
        UpdateType.MINOR,
        this._getUpdateAfterAddition()
    );
  }

  _handleDeleteClick() {
    this._changeData(
        UserAction.UPDATE_MOVIE_CARD,
        UpdateType.MINOR,
        this._getUpdateAfterDeletion()
    );
  }
}
