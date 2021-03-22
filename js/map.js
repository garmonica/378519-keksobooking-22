/* global L:readonly */
/* global _:readonly */
import { Ad } from './ad.js';
import { getData } from './api.js';
import { CITY_CENTER, initPage, address } from './user-form.js';
import { showAlert } from './util.js';
import { filters, filteredPins } from './filter.js';

const SIMILAR_ADS_COUNT = 10;
const RERENDER_DELAY = 500;

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
        Ad(point),
        {
          keepInView: true,
        },
      );
  });
}

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

const renderAllAds = (arr) => {
  const slicedAds = arr.slice(0, SIMILAR_ADS_COUNT);
  createMarkers(slicedAds);
}

const renderAds = (ads) => {

  ads.slice(0, SIMILAR_ADS_COUNT);
  renderAllAds(ads);

  // initPage();

  const onFiltersChange = () => {
    resetMarkers();

    let filteredData = filteredPins(ads);
    filteredData = filteredData.slice(0, SIMILAR_ADS_COUNT);

    const debounceRender = _.debounce(() => createMarkers(filteredData), RERENDER_DELAY);
    debounceRender();
  }

  filters.addEventListener('change', onFiltersChange);
}

getData(renderAds, showAlert);

export { mainMarker };
