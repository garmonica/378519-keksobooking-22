const filters = document.querySelector('.map__filters');

const houseTypeFilter = filters.querySelector('#housing-type');
const priceFilter = filters.querySelector('#housing-price');
const roomsFilter = filters.querySelector('#housing-rooms');
const guestsFilter = filters.querySelector('#housing-guests');

const checkBoxWiFi = filters.querySelector('#filter-wifi');
const checkBoxDishwasher = filters.querySelector('#filter-dishwasher');
const checkBoxParking = filters.querySelector('#filter-parking');
const checkBoxWasher = filters.querySelector('#filter-washer');
const checkBoxElevator = filters.querySelector('#filter-elevator');
const checkBoxConditioner = filters.querySelector('#filter-conditioner');

const filterByHouseType = (elem) => {
  let isHouseType = elem.offer.type === houseTypeFilter.value;
  return houseTypeFilter.value === 'any' ? true : isHouseType;
}

const PRICE = {
  MIN: 10000,
  MAX: 50000,
}

const filterToPrice = {
  'any': (price) => price,
  'low': (price) => price <= PRICE.MIN,
  'high': (price) => price >= PRICE.MAX,
  'middle': (price) => price >= PRICE.MIN && price <= PRICE.MAX,
}

const filterByPrice = (elem) => {
  let price = elem.offer.price;
  return filterToPrice[priceFilter.value](price);
}

const filterByRooms = (elem) => {
  let isRoom = elem.offer.rooms === parseInt(roomsFilter.value, 10);
  return roomsFilter.value === 'any' ? true : isRoom;
}

const filterByGuests = (elem) => {
  let isGuests = elem.offer.guests === parseInt(guestsFilter.value, 10);
  return guestsFilter.value === 'any' ? true : isGuests;
}

const filterByFeatures = (elem) => {
  let isWiFi = elem.offer.features.indexOf('wifi') !== -1;
  let isDishwasher = elem.offer.features.indexOf('dishwasher') !== -1;
  let isParking = elem.offer.features.indexOf('parking') !== -1;
  let isWasher = elem.offer.features.indexOf('washer') !== -1;
  let isElevator = elem.offer.features.indexOf('elevator') !== -1;
  let isConditioner = elem.offer.features.indexOf('conditioner') !== -1;

  let result = true;

  result = result && (checkBoxWiFi.checked ? isWiFi : true);
  result = result && (checkBoxDishwasher.checked ? isDishwasher : true);
  result = result && (checkBoxParking.checked ? isParking : true);
  result = result && (checkBoxWasher.checked ? isWasher : true);
  result = result && (checkBoxElevator.checked ? isElevator : true);
  result = result && (checkBoxConditioner.checked ? isConditioner : true);

  return result;
}

const filteredPins = (data) => data.filter((elem) => {
  return filterByHouseType(elem) &&
    filterByPrice(elem) &&
    filterByRooms(elem) &&
    filterByGuests(elem) &&
    filterByFeatures(elem)
});

export { filters, filteredPins };
