const apartmentToPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const apartmentType = document.querySelector('#type');
const apartmentPrice = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const onApartmentTypeChange = () => {
  apartmentPrice.placeholder = apartmentToPrice[apartmentType.value];
  apartmentPrice.setAttribute('min', apartmentToPrice[apartmentType.value]);
}

apartmentType.addEventListener('change', onApartmentTypeChange);

const onTimeInChange = function () {
  timeOut.value = timeIn.value;
}

const onTimeOutChange = function () {
  timeIn.value = timeOut.value;
}

timeIn.addEventListener('change', onTimeInChange);

timeOut.addEventListener('change', onTimeOutChange);
