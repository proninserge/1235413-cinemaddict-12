export const createMovieCardFullTemplate = (movie) => {

  const getGenre = (genres) => {
    let genreString = `<span class="film-details__genre">${genres[0]}</span>`;
    for (let i = 1; i < genres.length; i++) {
      genreString += `<span class="film-details__genre">${genres[i]}</span>`;
    }
    return genreString;
  };

  const getGenresCount = (genres) => {
    let form;
    if (genres.length === 1) {
      form = `Genre`;
    } else {
      form = `Genres`;
    }
    return form;
  };

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${movie.poster}" alt="">

            <p class="film-details__age">${movie.ageRating}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${movie.title}</h3>
                <p class="film-details__title-original">Original: ${movie.originalTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${movie.rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${movie.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${movie.writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${movie.actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${Object.values(movie.releaseDate).join(` `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${movie.duration.hours}h ${movie.duration.minutes}m</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${movie.country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${getGenresCount(movie.genres)}</td>
                <td class="film-details__cell">
                ${getGenre(movie.genres)}
              </tr>
            </table>

            <p class="film-details__film-description">
              ${movie.description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>


    </form>
  </section>`
  );
};
