const apartmentToPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const roomNumberToCapacity = {
  '1': [2],
  '2': [1, 2],
  '3': [0, 1, 2],
  '100': [3],
}

const apartmentTitle = document.querySelector('#title');
const type = document.querySelector('#type');
const apartmentPrice = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const onTypeChange = () => {
  apartmentPrice.placeholder = apartmentToPrice[type.value];
  apartmentPrice.setAttribute('min', apartmentToPrice[type.value]);
}

type.addEventListener('change', onTypeChange);

const onTimeInChange = () => timeOut.value = timeIn.value;
const onTimeOutChange = () => timeIn.value = timeOut.value;

timeIn.addEventListener('change', onTimeInChange);
timeOut.addEventListener('change', onTimeOutChange);

const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const capacityOptions = capacity.querySelectorAll('option');

const resetCapacity = () => {
  capacityOptions.forEach((capacity) => capacity.disabled = true);
  if (roomNumber.value === '1') {
    capacity[2].disabled = false;
  }
  capacity[2].selected = true;
}

const onRoomNumberClick = () => {
  resetCapacity();
  capacity.selectedIndex = -1;
  capacity.setCustomValidity('Необходимо выбрать количество гостей');
  capacity.style.border = '3px solid red';
  roomNumberToCapacity[roomNumber.value].forEach((selectedIndex) => capacity[selectedIndex].disabled = false);
}

const onCapacityChange = () => {
  capacity.setCustomValidity('');
  capacity.style.border = 'none';
}

roomNumber.addEventListener('click', onRoomNumberClick);
capacity.addEventListener('change', onCapacityChange);

apartmentTitle.addEventListener('input', () => {
  apartmentTitle.style.border = '3px solid red';
  if (apartmentTitle.validity.tooShort) {
    apartmentTitle.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
  } else if (apartmentTitle.validity.tooLong) {
    apartmentTitle.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
  } else if (apartmentTitle.validity.valueMissing) {
    apartmentTitle.setCustomValidity('Обязательное для заполнения поле');
  } else {
    apartmentTitle.setCustomValidity('');
    apartmentTitle.style.border = 'none';
  }
});

apartmentPrice.addEventListener('input', () => {
  apartmentPrice.style.border = '3px solid red';
  if (apartmentPrice.validity.rangeUnderflow) {
    apartmentPrice.setCustomValidity(`Минимальная цена ${apartmentPrice.getAttribute('min')} руб.`);
  } else if (apartmentPrice.validity.rangeOverflow) {
    apartmentPrice.setCustomValidity(`Максимальная цена ${apartmentPrice.getAttribute('max')} руб.`);
  } else if (apartmentPrice.validity.valueMissing) {
    apartmentPrice.setCustomValidity('Обязательное для заполнения поле');
  } else {
    apartmentPrice.setCustomValidity('');
    apartmentPrice.style.border = 'none';
  }
});

const resetFieldsStyle = () => {
  apartmentTitle.style.border = 'none';
  apartmentPrice.style.border = 'none';
  capacity.style.border = 'none';
}

export { resetCapacity, resetFieldsStyle };
