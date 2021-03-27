const housingType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
}

const removeBlock = (block) => {
  if (block.innerHTML === '') {
    block.remove();
  }
}

const adTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderAdItem = ({ author, offer }) => {
  const adItem = adTemplate.cloneNode(true);
  const featuresBlock = adItem.querySelector('.popup__features');
  const photosBlock = adItem.querySelector('.popup__photos');
  adItem.querySelector('.popup__avatar').src = author.avatar;
  adItem.querySelector('.popup__title').textContent = offer.title;
  adItem.querySelector('.popup__text--address').textContent = offer.address;
  adItem.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  adItem.querySelector('.popup__type').textContent = housingType[offer.type];
  adItem.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adItem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  featuresBlock.innerHTML = offer.features
    .map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`)
    .join('');
  removeBlock(featuresBlock);
  adItem.querySelector('.popup__description').textContent = offer.description;
  photosBlock.innerHTML = offer.photos
    .map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`)
    .join('');
  removeBlock(photosBlock);
  return adItem;
}

export { renderAdItem };
