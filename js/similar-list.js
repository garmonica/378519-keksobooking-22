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

const getFeatures = (features) => {
  const featureList = features.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`);
  return featureList.join('');
}

const getPhotos = (photos) => {
  const photoList = photos.map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
  return photoList.join('');
}

const getAdTemplate = (cardData) => {
  const adItem = adTemplate.cloneNode(true);
  adItem.querySelector('.popup__avatar').src = cardData.author.avatar;
  adItem.querySelector('.popup__title').textContent = cardData.offer.title;
  adItem.querySelector('.popup__text--address').textContent = cardData.offer.address;
  adItem.querySelector('.popup__text--price').textContent = `${cardData.offer.price} ₽/ночь`;
  adItem.querySelector('.popup__type').textContent = apartmentType[cardData.offer.type];
  adItem.querySelector('.popup__text--capacity').textContent = `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей`;
  adItem.querySelector('.popup__text--time').textContent = `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}`;
  adItem.querySelector('.popup__features').innerHTML = getFeatures(cardData.offer.features);
  adItem.querySelector('.popup__description').textContent = cardData.offer.description;
  adItem.querySelector('.popup__photos').innerHTML = getPhotos(cardData.offer.photos);
  return adItem;
}

const renderAdTemplate = (data) => {
  const similarAdsFragment = document.createDocumentFragment();
  similarAdsFragment.appendChild(getAdTemplate(data[0]));
  mapCanvas.appendChild(similarAdsFragment);
}

renderAdTemplate(similarAds);
