import CommentSectionView from '../view/comment-section';
import CommentMessageView from '../view/comment-message';
import NewCommentView from '../view/new-comment';
import {render, remove} from '../utils/dom';
import {UserAction, UpdateType, SHAKE_TIMEOUT, ERROR_COLOR, MARKED_FOR_DELETION} from '../constants';

export default class Comment {
  constructor(commentContainer, changeData, moviesModel, commentsModel, api) {
    this._commentContainer = commentContainer;
    this._changeData = changeData;
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._api = api;

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
    if (this._commentMessage !== null) {
      remove(this._commentMessage);
    }
    remove(this._commentSection);
    remove(this._newComment);
  }

  _renderComments() {
    render(this._commentContainer, this._commentSection);
    const commentList = this._commentSection.getCommentList();

    if (this._movie.comments.length !== 0) {
      this._movie.comments.forEach((commentID) => {
        const index = this._commentsModel.get().findIndex((comment) => commentID === comment.id);
        const comment = this._commentsModel.get()[index];
        this._commentMessage = new CommentMessageView(comment);
        render(commentList, this._commentMessage);
        if (comment.deletion === MARKED_FOR_DELETION) {
          this._shakeElement(this._commentMessage.getElement());
          comment.deletion = null;
        }
        this._commentMessage.setDeleteClickHandler(this._handleDeleteClick);
      });
    }

    this._newComment = new NewCommentView();
    render(this._commentSection, this._newComment);

    this._newComment.setCommentKeydownHandler(this._handleCommentSubmit);
    this._newComment.restoreHandlers();
  }

  _shakeElement(element) {
    const borderColor = element.style.borderColor;

    element.style.animation = `shake ${SHAKE_TIMEOUT / 1000}s`;
    element.style.borderColor = ERROR_COLOR;

    setTimeout(() => {
      element.style.animation = ``;
      element.style.animation = ``;
      element.style.borderColor = borderColor;
      element.disabled = false;
      element.focus();
    }, SHAKE_TIMEOUT);
  }

  _getUpdateAfterAddition() {
    if (this._newComment.getNew().emotion !== `` && this._newComment.getNew().comment !== ``) {
      this._newComment.getMessageArea().disabled = true;
      this._api.addComment(this._movie, this._newComment.getNew())
        .then((response) => {
          this._commentsModel.set(UpdateType.MINOR, response);
          this._changeData(
              UserAction.UPDATE_MOVIE_CARD,
              UpdateType.MINOR,
              this._movie
          );
        })
        .catch(() => {
          this._shakeElement(this._newComment.getMessageArea());
        });
    }
  }

  _getUpdateAfterDeletion() {
    const comments = this._commentsModel.get();
    const index = comments.findIndex((comment) => comment.delete);
    this._api.deleteComment(comments[index].id)
        .then(() => {
          this._commentsModel.deleteComment(comments[index].id);
          this._changeData(
              UserAction.UPDATE_MOVIE_CARD,
              UpdateType.MINOR,
              this._movie
          );
        })
        .catch(() => {
          if (this._commentMessage !== null) {
            remove(this._commentMessage);
          }
          remove(this._newComment);
          this.init(this._movie);
        });
  }

  _handleCommentSubmit() {
    this._getUpdateAfterAddition();
  }

  _handleDeleteClick() {
    this._getUpdateAfterDeletion();
  }
}
