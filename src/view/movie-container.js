import AbstractView from "./abstract.js";

const createMovieContainerTemplate = () => {
  return (
    `<div class="films-list__container">
    </div>`
  );
};

export default class MovieContainer extends AbstractView {

  getTemplate() {
    return createMovieContainerTemplate();
  }

}
