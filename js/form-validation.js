// module5-task2
// Количество комнат и мест - синхронизация ============================
const apartmentToPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}
const apartmentType = document.querySelector('#type');
const apartmentPrice = document.querySelector('#price');
const onApartmentTypeChange = () => {
  apartmentPrice.placeholder = apartmentToPrice[apartmentType.value];
  apartmentPrice.setAttribute('min', apartmentToPrice[apartmentType.value]);
}
apartmentType.addEventListener('change', onApartmentTypeChange);

// Время заезда и выезда - синхронизация ============================
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const onTimeInChange = function () {
  timeOut.value = timeIn.value;
}
const onTimeOutChange = function () {
  timeIn.value = timeOut.value;
}
timeIn.addEventListener('change', onTimeInChange);
timeOut.addEventListener('change', onTimeOutChange);

// module6-task2:
// Количество комнат и мест - синхронизация ============================

const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const capacityOptions = capacity.querySelectorAll('option');

if (roomNumber.value === '1') {
  capacityOptions[0].disabled = true;
  capacityOptions[1].disabled = true;
  capacityOptions[2].disabled = false;
  capacityOptions[3].disabled = true;
  capacityOptions[2].selected = true;
}

roomNumber.addEventListener('change', () => {
  if (roomNumber.value === '1') {
    capacityOptions[0].disabled = true;
    capacityOptions[1].disabled = true;
    capacityOptions[2].disabled = false;
    capacityOptions[3].disabled = true;
    capacityOptions[2].selected = true;
  }
  if (roomNumber.value === '2') {
    capacityOptions[0].disabled = true;
    capacityOptions[1].disabled = false;
    capacityOptions[2].disabled = false;
    capacityOptions[3].disabled = true;
    capacityOptions[2].selected = true;
  }
  if (roomNumber.value === '3') {
    capacityOptions[0].disabled = false;
    capacityOptions[1].disabled = false;
    capacityOptions[2].disabled = false;
    capacityOptions[3].disabled = true;
    capacityOptions[2].selected = true;
  }
  if (roomNumber.value === '100') {
    capacityOptions[0].disabled = true;
    capacityOptions[1].disabled = true;
    capacityOptions[2].disabled = true;
    capacityOptions[3].disabled = false;
    capacityOptions[3].selected = true;
  }
});

// roomNumber.addEventListener('invalid', () => {
//   if (roomNumber.value === '1' && capacity.value !== '1') {
//     capacity.setCustomValidity('Выбранное значение «для 1 гостя»');
//   } else {
//     capacity.setCustomValidity('');
//   }
// });

// - 1 комната (value="1")    — «для 1 гостя»; (value="1")
// - 2 комнаты (value="2")    — «для 2 гостей» или «для 1 гостя»; (value="2")
// - 3 комнаты (value="3")    — «для 3 гостей», «для 2 гостей» или «для 1 гостя»; (value="3")
// - 100 комнат (value="100") — «не для гостей». (value="0")
