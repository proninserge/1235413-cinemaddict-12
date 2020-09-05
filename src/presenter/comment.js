import CommentSectionView from '../view/comment-section';
import CommentMessageView from '../view/comment-message';
import NewCommentView from '../view/new-comment';
import {render, remove} from '../utils/dom';
import {UserAction, UpdateType} from '../constants';

export default class Comment {
  constructor(commentContainer, changeData, moviesModel, commentsModel) {
    this._commentContainer = commentContainer;
    this._changeData = changeData;
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;

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
        this._commentMessage = new CommentMessageView(this._commentsModel.get()[index]);
        render(commentList, this._commentMessage);
        this._commentMessage.setDeleteClickHandler(this._handleDeleteClick);
      });
    }

    this._newComment = new NewCommentView();
    render(this._commentSection, this._newComment);

    this._newComment.setCommentKeydownHandler(this._handleCommentSubmit);
    this._newComment.restoreHandlers();
  }

  _getUpdateAfterAddition() {
    return this._newComment.getNew().emotion !== `` && this._newComment.getNew().text !== ``
      ? Object.assign(
          {},
          this._movie,
          {
            comments: [
              ...this._movie.comments.slice(),
              this._newComment.getNew()
            ]
          }
      )
      : this._movie;
  }

  _getUpdateAfterDeletion() {
    const commentIndex = this._movie.comments.findIndex((comment) => comment.delete);
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
