import ProfileView from '../view/profile.js';
import {render, replace, remove} from '../utils/dom.js';

export default class Profile {
  constructor(profileContainer, moviesModel) {
    this._profileContainer = profileContainer;
    this._moviesModel = moviesModel;

    this._profile = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    const previousProfile = this._profile;

    this._profile = new ProfileView(this._moviesModel.get());

    if (previousProfile === null) {
      render(this._profileContainer, this._profile);
      return;
    }

    replace(this._profile, previousProfile);
    remove(previousProfile);
  }

  _handleModelEvent() {
    this.init();
  }
}
