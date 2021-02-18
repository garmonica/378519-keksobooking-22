import {TYPE as TYPE_DATA} from './data.js';
import {createSimilarAdvertisements} from './data.js';

const TYPE = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
const mapCanvas = document.querySelector('.map__canvas');
const similarAdvertisementTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarAdvertisementsFragment = document.createDocumentFragment();
const similarAdvertisements = createSimilarAdvertisements();

similarAdvertisements.forEach(({author, offer}) => {
  const advertisementItem = similarAdvertisementTemplate.cloneNode(true);
  const featuresBlock = advertisementItem.querySelector('.popup__features');
  const feature = advertisementItem.querySelectorAll('.popup__feature');
  const photosBlock = advertisementItem.querySelector('.popup__photos');
  const photoTemplate = advertisementItem.querySelector('.popup__photo');
  const photosFragment = document.createDocumentFragment();
  advertisementItem.querySelector('.popup__avatar').src = author.avatar;
  advertisementItem.querySelector('.popup__title').textContent = offer.title;
  advertisementItem.querySelector('.popup__text--address').textContent = offer.address;
  advertisementItem.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  TYPE_DATA.forEach((elem, i) => {
    if (elem.includes(offer.type)) {
      advertisementItem.querySelector('.popup__type').textContent = TYPE[i];
    }
  });
  advertisementItem.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  advertisementItem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  if (offer.features.length === 0) {
    featuresBlock.innerHTML = '';
  }
  offer.features.forEach((elem, i) => {
    if (!feature[i].classList.contains(elem)) {
      featuresBlock.removeChild(feature[i]);
    }
  });
  advertisementItem.querySelector('.popup__description').textContent = offer.description;
  photosBlock.innerHTML = '';
  offer.photos.forEach((elem) => {
    const newPhoto = photoTemplate.cloneNode(true);
    newPhoto.src = elem;
    photosFragment.appendChild(newPhoto);
  });
  photosBlock.appendChild(photosFragment);
  similarAdvertisementsFragment.appendChild(advertisementItem);
});

mapCanvas.appendChild(similarAdvertisementsFragment);
