import { sendData } from './api.js';
import { mainMarker } from './map.js';
import { showMessage } from './status-message.js';

const messageClassName = {
  success: 'success',
  error: 'error',
}

const CITY_CENTER = {
  lat: 35.85000,
  lng: 139.75000,
};

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterChildren = mapFilter.children;
const address = adForm.querySelector('#address');

const setDisabledAttr = (arr) => {
  for (let elem of arr) {
    elem.disabled = true;
  }
}

const removeDisabledAttr = (arr) => {
  for (let elem of arr) {
    elem.disabled = false;
  }
}

const resetPage = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('.map__filters--disabled');
  setDisabledAttr(adFormFieldsets);
  setDisabledAttr(mapFilterChildren);
}
resetPage();

const initPage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('.map__filters--disabled');
  removeDisabledAttr(adFormFieldsets);
  removeDisabledAttr(mapFilterChildren);
  address.value = `${CITY_CENTER.lat.toFixed(5)}, ${CITY_CENTER.lng.toFixed(5)}`;
  address.setAttribute('readonly', 'readonly');
}

// сброс формы
const resetForm = (form) => {
  mainMarker.setLatLng([CITY_CENTER.lat, CITY_CENTER.lng]);
  form.reset();
  address.value = `${CITY_CENTER.lat.toFixed(5)}, ${CITY_CENTER.lng.toFixed(5)}`;
}

// очистка формы и фильтра по нажатию на "очистить"
const resetButton = adForm.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm(adForm);
  resetForm(mapFilter);
});

// отправка заполненных данных формы на сервер

const onSuccessUpload = () => {
  showMessage('success');
  resetForm(adForm);
  resetForm(mapFilter);
}

const onErrorUpload = () => {
  showMessage('error');
}

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(onSuccessUpload, onErrorUpload, formData);
}

adForm.addEventListener('submit', onFormSubmit);

export { CITY_CENTER, initPage, address };
