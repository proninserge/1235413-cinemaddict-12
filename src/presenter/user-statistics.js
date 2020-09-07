import UserStatisticsView from '../view/user-statistics';
import {FilterType} from '../constants';
import {render, remove} from '../utils/dom';

export default class UserStatistics {
  constructor(userStatisticsContainer, moviesModel, filterModel) {
    this._userStatisticsContainer = userStatisticsContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;

    this._userStatistics = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    if (this._filterModel.get() === FilterType.STATS && this._userStatistics === null) {
      this._render();
      this._userStatistics.restoreHandlers();
    } else if (this._filterModel.get() !== FilterType.STATS && this._userStatistics !== null) {
      remove(this._userStatistics);
      this._userStatistics = null;
    }
  }

  _render() {
    this._userStatistics = new UserStatisticsView(this._moviesModel.get());
    render(this._userStatisticsContainer, this._userStatistics);
  }

  _handleModelEvent() {
    this.init();
  }
}
