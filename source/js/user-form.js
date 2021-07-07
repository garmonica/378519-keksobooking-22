import { sendData, getData } from './api.js';
import { mainMarker, renderAds } from './map.js';
import { showMessage } from './status-message.js';
import { resetCapacity, resetFieldsStyle } from './form-validation.js';
import { resetPreviews } from './image-preview.js';

const CITY_CENTER = {
  lat: 35.85000,
  lng: 139.76000,
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

const blockPage = () => {
  adForm.classList.add('ad-form--disabled');
  setDisabledAttr(adFormFieldsets);
  mapFilter.classList.add('.map__filters--disabled');
  setDisabledAttr(mapFilterChildren);
}

blockPage();

const initMapFilter = () => {
  mapFilter.classList.remove('.map__filters--disabled');
  removeDisabledAttr(mapFilterChildren);
}

const initAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  removeDisabledAttr(adFormFieldsets);
  address.value = `${CITY_CENTER.lat.toFixed(5)}, ${CITY_CENTER.lng.toFixed(5)}`;
  address.setAttribute('readonly', 'readonly');
  resetCapacity();
}

const resetForm = (form) => {
  mainMarker.setLatLng([CITY_CENTER.lat, CITY_CENTER.lng]);
  form.reset();
  address.value = `${CITY_CENTER.lat.toFixed(5)}, ${CITY_CENTER.lng.toFixed(5)}`;
  resetCapacity();
  resetFieldsStyle();
}

const buttonReset = adForm.querySelector('.ad-form__reset');

buttonReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm(adForm);
  resetForm(mapFilter);
  resetPreviews();
  getData(renderAds);
});

const onSuccessUpload = () => {
  showMessage('success');
  resetForm(adForm);
  resetForm(mapFilter);
  resetPreviews();
  getData(renderAds);
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

export { CITY_CENTER, initAdForm, initMapFilter, address };
