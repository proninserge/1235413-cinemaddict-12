import AbstractView from './abstract';

const createMovieSectionTemplate = () => {
  return (
    `<section class="films">
     </section>`
  );
};

export default class MovieSection extends AbstractView {

  getTemplate() {
    return createMovieSectionTemplate();
  }

}
