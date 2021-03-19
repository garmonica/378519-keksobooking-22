/* global L:readonly */
// /* global _:readonly */
import { getAdTemplate } from './ad-item.js';
import { getData } from './api.js';
import { CITY_CENTER, initPage, address } from './user-form.js';
import { showAlert } from './util.js';

const SIMILAR_ADS_COUNT = 10;
// const RERENDER_DELAY = 500;

const map = L.map('map-canvas')
  .on('load', () => {
    initPage();
  })
  .setView({
    lat: CITY_CENTER.lat,
    lng: CITY_CENTER.lng,
  }, 9);

const mapLayer = L.tileLayer(
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

const markerIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
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

const marker = L.marker;

const mapFilter = document.querySelector('.map__filters');
const mapFilters = mapFilter.querySelectorAll('.map__filter');
const housingType = mapFilter.querySelector('#housing-type');
// const housingPrice = mapFilter.querySelector('#housing-price');
const housingRooms = mapFilter.querySelector('#housing-rooms');
const housingGuests = mapFilter.querySelector('#housing-guests');
const housingFeatures = mapFilter.querySelector('#housing-features');
// const featuresInputs = housingFeatures.querySelectorAll('input');

// функция создания меток на карте
const createMarkers = (arr) => {
  arr.forEach((point) => {
    const { location } = point;
    marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: markerIcon,
      })
      .addTo(map)
      .bindPopup(
        getAdTemplate(point),
        {
          keepInView: true,
        },
      );
  });
}

// удаление всех меток:
const resetMarkers = () => {
  // удаляет все слои, в том числе и изображения карты и главную метку
  // поэтому две последние строчки - заново добавление изображения карты и главной метки
  // карта каждый раз перезагружается, вряд ли это хорошо
  // непонятно, как удалять ТОЛЬКО обычные метки
  map.eachLayer(function (layer) {
    map.removeLayer(layer);
  });
  mapLayer.addTo(map);
  mainMarker.addTo(map);
}

// функция создания всех 10-ти меток:
const renderAllAds = (arr) => {
  const slicedAds = arr.slice(0, SIMILAR_ADS_COUNT);
  createMarkers(slicedAds);
}



// функции под фильтры, работают независимо друг от друга... как скомбинировать несколько выбранных опций в разных фильтрах...

// const makeTypeFilter = (arr) => {
//   if (housingType.value !== 'any') {
//     return filteredAds = arr.slice(0, SIMILAR_ADS_COUNT)
//       .filter((elem) => elem.offer.type === housingType.value);
//   }
// }
// const makePriceFilter = (arr) => {
//   if (housingPrice.value !== 'any') {
//     if (housingPrice.value === 'middle') {
//       return filteredAds = arr.slice(0, SIMILAR_ADS_COUNT)
//         .filter((elem) => elem.offer.price >= 10000 && elem.offer.price <= 50000);
//     }
//     if (housingPrice.value === 'low') {
//       return filteredAds = arr.slice(0, SIMILAR_ADS_COUNT)
//         .filter((elem) => elem.offer.price < 10000);
//     }
//     if (housingPrice.value === 'high') {
//       return filteredAds = arr.slice(0, SIMILAR_ADS_COUNT)
//         .filter((elem) => elem.offer.price > 50000);
//     }
//   }
// }
// const makeRoomsFilter = (arr) => {
//   if (housingRooms.value !== 'any') {
//     return filteredAds = arr.slice(0, SIMILAR_ADS_COUNT)
//       .filter((elem) => elem.offer.rooms === parseInt(housingRooms.value));
//   }
// }
// const makeGuestsFilter = (arr) => {
//   if (housingGuests.value !== 'any') {
//     return filteredAds = arr.slice(0, SIMILAR_ADS_COUNT)
//       .filter((elem) => elem.offer.rooms === parseInt(housingGuests.value));
//   }
// }


let filteredAds = [];

const renderMarkers = (ads) => {
  renderAllAds(ads);

  for (let el of mapFilters) {
    el.addEventListener('change', () => {

      resetMarkers();

      // makeTypeFilter(ads);
      // makePriceFilter(ads);
      // makeRoomsFilter(ads);
      // makeGuestsFilter(ads);




      // МНОГОСЛОВНО И ДАЛЕКО НЕ ВСЁ УЧТЕНО:
      if (housingType.value && housingRooms.value && housingGuests.value) {
        filteredAds = ads.slice(0, SIMILAR_ADS_COUNT)
          .filter((elem) => elem.offer.type === housingType.value &&
            elem.offer.rooms === parseInt(housingRooms.value) &&
            elem.offer.guests === parseInt(housingGuests.value));
      }
      if (housingType.value === 'any' && housingRooms.value && housingGuests.value) {
        filteredAds = ads.slice(0, SIMILAR_ADS_COUNT)
          .filter((elem) => elem.offer.rooms === parseInt(housingRooms.value) &&
            elem.offer.guests === parseInt(housingGuests.value));
      }
      if (housingType.value && housingRooms.value === 'any' && housingGuests.value) {
        filteredAds = ads.slice(0, SIMILAR_ADS_COUNT)
          .filter((elem) => elem.offer.type === housingType.value &&
            elem.offer.rooms === parseInt(housingGuests.value));
      }
      if (housingType.value && housingRooms.value && housingGuests.value === 'any') {
        filteredAds = ads.slice(0, SIMILAR_ADS_COUNT)
          .filter((elem) => elem.offer.type === housingType.value &&
            elem.offer.rooms === parseInt(housingRooms.value));
      }
      if (housingType.value && housingRooms.value === 'any' && housingGuests.value === 'any') {
        filteredAds = ads.slice(0, SIMILAR_ADS_COUNT)
          .filter((elem) => elem.offer.type === housingType.value);
      }
      if (housingType.value === 'any' && housingRooms.value === 'any' && housingGuests.value === 'any') {
        filteredAds = ads.slice(0, SIMILAR_ADS_COUNT)
      }



      createMarkers(filteredAds);




    });

    // фильтр удобств, тоже недоработано
    const inputsFeatures = housingFeatures.querySelectorAll('input');
    for (let el of inputsFeatures) {
      el.addEventListener('click', (evt) => {
        resetMarkers();
        if (evt.target.checked) {
          filteredAds = ads.slice(0, SIMILAR_ADS_COUNT)
            .filter((elem) => elem.offer.features.includes(evt.target.value));
          createMarkers(filteredAds);
        }
      });
    }
  }
}

getData(renderMarkers, showAlert);

export { mainMarker };
