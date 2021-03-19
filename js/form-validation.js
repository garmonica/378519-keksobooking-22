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

const roomNumberToCapacity = {
  '1': [2],
  '2': [1, 2],
  '3': [0, 1, 2],
  '100': [3],
}

const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const capacityOptions = capacity.querySelectorAll('option');

const capacityReset = () => {
  capacityOptions.forEach((capacity) => capacity.disabled = true);
  if (roomNumber.value === '1') {
    capacity[2].disabled = false;
  }
  capacity[2].selected = true;
}

const onRoomNumberClick = () => {
  capacityReset();
  capacity.selectedIndex = -1;
  capacity.setCustomValidity('Нужно выбрать комнату');
  roomNumberToCapacity[roomNumber.value].forEach((selectedIndex) => capacity[selectedIndex].disabled = false);
}

const onCapacityChange = () => capacity.setCustomValidity('');

roomNumber.addEventListener('click', onRoomNumberClick);
capacity.addEventListener('change', onCapacityChange);

export { capacityReset };
