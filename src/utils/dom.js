import Abstract from "../view/abstract.js";

const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
};

const render = (container, element, place = RenderPosition.BEFORE_END) => {

  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFORE_END:
      container.append(element);
      break;
    default:
      throw new Error(`Unknown render position: ${place}`);
  }
};

const replace = (newComponent, oldComponent) => {
  if (oldComponent instanceof Abstract) {
    oldComponent = oldComponent.getElement();
  }

  if (newComponent instanceof Abstract) {
    newComponent = newComponent.getElement();
  }

  const parent = oldComponent.parentElement;

  if (parent === null || oldComponent === null || newComponent === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newComponent, oldComponent);
};


const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

/*
const renderTemplate = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};
*/

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {RenderPosition, render, replace, remove, createElement};
