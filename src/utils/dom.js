const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const getActiveControl = (attribute) => {
  return attribute
    ? `film-card__controls-item--active`
    : ``;
};

const getGenre = (genres) => {
  return genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(` `);
};

const getGenresCount = (genres) => {
  return genres.length === 1
    ? `Genre`
    : `Genres`;
};

export {render, getActiveControl, getGenre, getGenresCount};
