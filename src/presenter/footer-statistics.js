import FooterStatisticsView from '../view/footer-statistics';
import {render, replace, remove} from '../utils/dom';

export default class FooterStatistics {
  constructor(footerStatisticsContainer, moviesModel) {
    this._footerStatisticsContainer = footerStatisticsContainer;
    this._moviesModel = moviesModel;

    this._footerStatistics = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    const previousFooterStatistics = this._footerStatistics;

    this._footerStatistics = new FooterStatisticsView(this._moviesModel.get());

    if (previousFooterStatistics === null) {
      render(this._footerStatisticsContainer, this._footerStatistics);
      return;
    }

    replace(this._footerStatistics, previousFooterStatistics);
    remove(previousFooterStatistics);
  }

  _handleModelEvent() {
    this.init();
  }
}
