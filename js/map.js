/* global L:readonly */
import {createSimilarAds} from './data.js';
import {getAdTemplate} from './similar-item.js';

const CITY_CENTER = {
  lat: 35.67500,
  lng: 139.75000,
};

const similarAds = createSimilarAds();

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterChildren = mapFilter.children;
const address = adForm.querySelector('#address');
address.value = `${CITY_CENTER.lat.toFixed(5)}, ${CITY_CENTER.lng.toFixed(5)}`;
address.setAttribute('readonly', 'readonly');

const setDisabledAttr = (arr) => {
  for (let elem of arr) {
    elem.setAttribute('disabled', 'disabled');
  }
}

const removeDisabledAttr = (arr) => {
  for (let elem of arr) {
    elem.removeAttribute('disabled');
  }
}

const resetPage = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('.map__filters--disabled');
  setDisabledAttr(adFormFieldsets);
  setDisabledAttr(mapFilterChildren);
}

resetPage();

const initPage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('.map__filters--disabled');
  removeDisabledAttr(adFormFieldsets);
  removeDisabledAttr(mapFilterChildren);
}

const map = L.map('map-canvas')
  .on('load', () => {
    initPage();
  })
  .setView({
    lat: CITY_CENTER.lat,
    lng: CITY_CENTER.lng,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarkerIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: CITY_CENTER.lat,
    lng: CITY_CENTER.lng,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
).addTo(map);

mainMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  address.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
});

similarAds.forEach((point) => {
  const {location} = point;
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat: location.x,
      lng: location.y,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(
      getAdTemplate(point),
      {
        keepInView: true,
      },
    );
});
