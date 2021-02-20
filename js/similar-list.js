import {createSimilarAds} from './data.js';

const apartmentType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
}

const mapCanvas = document.querySelector('.map__canvas');
const adTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarAds = createSimilarAds();

const getAdTemplate = ({author, offer}) => {
  const adItem = adTemplate.cloneNode(true);
  adItem.querySelector('.popup__avatar').src = author.avatar;
  adItem.querySelector('.popup__title').textContent = offer.title;
  adItem.querySelector('.popup__text--address').textContent = offer.address;
  adItem.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  adItem.querySelector('.popup__type').textContent = apartmentType[offer.type];
  adItem.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adItem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  adItem.querySelector('.popup__features').innerHTML = offer.features
    .map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`)
    .join('');
  adItem.querySelector('.popup__description').textContent = offer.description;
  adItem.querySelector('.popup__photos').innerHTML = offer.photos
    .map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`)
    .join('');
  return adItem;
}

const renderAdTemplate = (data) => {
  const similarAdsFragment = document.createDocumentFragment();
  similarAdsFragment.appendChild(getAdTemplate(data[0]));
  mapCanvas.appendChild(similarAdsFragment);
}

renderAdTemplate(similarAds);
