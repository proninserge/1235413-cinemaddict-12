import AbstractView from '../view/abstract';

const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`
};

const render = (container, element, place = RenderPosition.BEFORE_END) => {

  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (element instanceof AbstractView) {
    element = element.getElement();
  }

  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFORE_END:
      container.append(element);
      break;
    case RenderPosition.AFTER_END:
      container.parentNode.append(element);
      break;
    default:
      throw new Error(`Unknown render position: ${place}`);
  }
};

const replace = (newComponent, oldComponent) => {
  if (oldComponent instanceof AbstractView) {
    oldComponent = oldComponent.getElement();
  }

  if (newComponent instanceof AbstractView) {
    newComponent = newComponent.getElement();
  }

  if (oldComponent === null || newComponent === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  oldComponent.replaceWith(newComponent);
};


const remove = (component) => {
  if (!(component instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

export {RenderPosition, render, replace, remove};
