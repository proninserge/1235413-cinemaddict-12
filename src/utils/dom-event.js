import {KeyboardKey, MouseButton} from '../constants.js';

const isEscapeEvent = (evt) => {
  return evt.key === KeyboardKey.ESCAPE || evt.key === KeyboardKey.ESCAPE_IE;
};

const isLeftMouseEvent = (evt) => {
  return evt.button === MouseButton.MAIN;
};

export {isEscapeEvent, isLeftMouseEvent};
