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
  capacity.setCustomValidity('Нужно выбрать комнату');
  roomNumberToCapacity[roomNumber.value].forEach((selectedIndex) => capacity[selectedIndex].disabled = false);
}

const onCapacityChange = () => capacity.setCustomValidity('');

roomNumber.addEventListener('click', onRoomNumberClick);
capacity.addEventListener('change', onCapacityChange);

// ВАЛИДАЦИЯ ДЛЯ ПОЛЕЙ ТЗ 2.4, доделать
const apartmentTitle = document.querySelector('#title');

apartmentTitle.addEventListener('invalid', () => {
  apartmentTitle.style.borderColor = 'red';
  apartmentTitle.style.borderWidth = '3px';
  if (apartmentTitle.validity.tooShort) {
    apartmentTitle.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
  } else if (apartmentTitle.validity.tooLong) {
    apartmentTitle.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
  } else if (apartmentTitle.validity.valueMissing) {
    apartmentTitle.setCustomValidity('Обязательное для заполнения поле');
  } else {
    apartmentTitle.setCustomValidity('');
    apartmentTitle.style.borderColor = '';
    apartmentTitle.style.borderWidth = '';
  }
});

// rangeUnderflow / rangeOverflow не работают
apartmentPrice.addEventListener('invalid', () => {
  apartmentPrice.style.borderColor = 'red';
  apartmentPrice.style.borderWidth = '3px';
  if (apartmentPrice.validity.rangeUnderflow) {
    apartmentPrice.setCustomValidity('Неверное значение');
  } else if (apartmentPrice.validity.rangeOverflow) {
    apartmentPrice.setCustomValidity('Неверное значение');
  } else if (apartmentPrice.validity.valueMissing) {
    apartmentPrice.setCustomValidity('Обязательное для заполнения поле');
  } else {
    apartmentPrice.setCustomValidity('');
    apartmentPrice.style.borderColor = '';
    apartmentPrice.style.borderWidth = '';
  }
});

export { resetCapacity };
