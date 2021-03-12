import {isEsc} from './util.js';

const main = document.querySelector('main');
const getMessageElement = (elemId, elemClass) => {
  const elementTemplate = document.querySelector(elemId).content.querySelector(elemClass);
  const element = elementTemplate.cloneNode(true);
  element.style.zIndex = 1100;
  main.appendChild(element);
  element.classList.add('hidden');
  return element;
}
const success = getMessageElement('#success', '.success');
const error = getMessageElement('#error', '.error');

const onEscKeydown = (status, evt) => isEsc(evt, closeMessage(status));

const onWindowClick = (status) => closeMessage(status);

const showMessage = (status) => {
  status.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeydown.bind(null, status));
  document.addEventListener('click', onWindowClick.bind(null, status));
}

const closeMessage = (status) => {
  status.classList.add('hidden');
  document.removeEventListener('keydown', onEscKeydown.bind(null, status));
  document.removeEventListener('click', onWindowClick.bind(null, status));
}

closeMessage(success);
closeMessage(error);

// Нужно ли вешать ещё на кнопку событие? Работает и без этого (т.к. клик на произвольную область)

// const errorButton = error.querySelector('.error__button');
// errorButton.addEventListener('click', () => {
//   closeErrorMessage();
// })

// ------------------------------------------------------------------------------------------------------------------
// Исходный вариант - задвоенные функции:

// // если клик по экрану
// const onWindowClickError = () => {
//   closeErrorMessage();
// }
// const onWindowClickSuccess = () => {
//   closeSuccessMessage();
// }

// // если нажатие Esc
// const onEscKeydownError = (evt) => {
//   if (isEsc(evt)) {
//     evt.preventDefault();
//     closeErrorMessage();
//   }
// }
// const onEscKeydownSuccess = (evt) => {
//   if (isEsc(evt)) {
//     evt.preventDefault();
//     closeSuccessMessage();
//   }
// }

// // показ сообщений
// const showErrorMessage = () => {
//   error.classList.remove('hidden');
//   document.addEventListener('keydown', onEscKeydownError);
//   document.addEventListener('click', onWindowClickError);
// }
// const showSuccessMessage = () => {
//   success.classList.remove('hidden');
//   document.addEventListener('keydown', onEscKeydownSuccess);
//   document.addEventListener('click', onWindowClickSuccess);
// }

// // скрытие сообщений
// const closeErrorMessage = () => {
//   error.classList.add('hidden');
//   document.removeEventListener('keydown', onEscKeydownError);
//   document.removeEventListener('click', onWindowClickError);
// }
// const closeSuccessMessage = () => {
//   success.classList.add('hidden');
//   document.removeEventListener('keydown', onEscKeydownSuccess);
//   document.removeEventListener('click', onWindowClickSuccess);
// }

export {showMessage, error, success};
