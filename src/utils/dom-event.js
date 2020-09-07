import {KeyboardKey, MouseButton} from '../constants';

const isEscapeEvent = (evt) => {
  return evt.key === KeyboardKey.ESCAPE || evt.key === KeyboardKey.ESCAPE_IE;
};

const isLeftMouseEvent = (evt) => {
  return evt.button === MouseButton.MAIN;
};

const isCtrlEnterEvent = (evt) => {
  return evt.ctrlKey && evt.key === KeyboardKey.ENTER;
};

export {isEscapeEvent, isLeftMouseEvent, isCtrlEnterEvent};
