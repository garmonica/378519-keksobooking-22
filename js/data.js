import {getRandomInteger, getRandomDecimal, getRandomArrayElement, getRandomArray} from './util.js';

const SIMILAR_ADVERTISEMENT_COUNT = 1;
const TITLE = ['Шикарное жилище на берегу моря', 'Царские апартаменты по смешной стоимости', 'Недорогое жильё для прекрасного отдыха'];
const TYPE = ['palace', 'flat', 'house', 'bungalow'];
const CHECK_TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTION = ['Чисто и уютно, уборка раз в два дня, холодильник, душ, всё есть', 'Жильё прямо в центре города, недалеко от основных достопримечательностей города', 'В пяти шагах от метро, все удобства'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const createAdvertisement = () => {
  return {
    author: {
      avatar: `img/avatars/user0${getRandomInteger(1, 8)}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLE),
      address: `${getRandomDecimal(-180, 180)}, ${getRandomDecimal(-180, 180)}`,
      price: getRandomInteger(500, 100000),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 10),
      checkin: getRandomArrayElement(CHECK_TIME),
      checkout: getRandomArrayElement(CHECK_TIME),
      features: getRandomArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTION),
      photos: getRandomArray(PHOTOS),
    },
    location: {
      x: getRandomDecimal(35.65000, 35.70000),
      y: getRandomDecimal(139.7000, 139.80000),
    },
  };
};

const createSimilarAdvertisements = () => new Array(SIMILAR_ADVERTISEMENT_COUNT).fill(null).map(() => createAdvertisement());

export {TYPE};
export {createSimilarAdvertisements};
