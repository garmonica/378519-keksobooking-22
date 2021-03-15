import { isEsc } from './util.js';

const main = document.querySelector('main');

const getMessageElement = (elemType) => {
  const elementTemplate = document.querySelector(`#${elemType}`).content.querySelector(`.${elemType}`);
  const element = elementTemplate.cloneNode(true);
  element.style.zIndex = 1100;
  element.classList.add('hidden');
  return element;
}

export const renderMessageElements = () => {
  main.appendChild(getMessageElement('success'));
  main.appendChild(getMessageElement('error'));
}

export const showMessage = (status) => {
  const statusMessage = document.querySelector(`.${status}`);
  statusMessage.classList.remove('hidden');
  const closeMessage = () => statusMessage.classList.add('hidden');

  const onDocumentKeyDown = (evt) => {
    isEsc(evt, closeMessage);
    document.removeEventListener('keydown', onDocumentKeyDown);
    document.removeEventListener('click', onDocumentClick);
  }

  const onDocumentClick = () => {
    closeMessage();
    document.removeEventListener('keydown', onDocumentKeyDown);
    document.removeEventListener('click', onDocumentClick);
  }

  document.addEventListener('keydown', onDocumentKeyDown);
  document.addEventListener('click', onDocumentClick);
}
