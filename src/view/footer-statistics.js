import AbstractView from './abstract';

const createFooterStatisticsTemplate = (movies) => {
  return (
    `<section class="footer__statistics">
       <p>${movies.length} movies inside</p>
     </section>`
  );
};

export default class FooterStatistics extends AbstractView {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._movies);
  }

}
