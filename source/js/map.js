/* global L:readonly */
/* global _:readonly */
import { renderAdItem } from './ad.js';
import { getData } from './api.js';
import { CITY_CENTER, initAdForm, initMapFilter, address } from './user-form.js';
import { showAlert } from './util.js';
import { filters, filteredPins } from './filter.js';

const SIMILAR_ADS_COUNT = 10;
const RERENDER_DELAY = 500;

const map = L.map('map-canvas')
  .on('load', () => {
    initAdForm();
  })
  .setView({
    lat: CITY_CENTER.lat,
    lng: CITY_CENTER.lng,
  }, 9);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarkerIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const markerIcon = L.icon({
  iconUrl: './img/pin.svg',
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

let markers = [];

const createMarkers = (arr) => {
  resetMarkers();

  arr.forEach((point, number) => {
    const { location } = point;

    const marker = new L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: markerIcon,
      });

    markers.push(marker);

    markers[number].addTo(map)
      .bindPopup(
        renderAdItem(point),
        {
          keepInView: true,
        },
      );
  });
}

const resetMarkers = () => {
  markers.forEach((marker) => {
    map.removeLayer(marker)
  });
  markers = [];
}

const renderAllMarkers = (arr) => {

  const slicedAds = arr.slice(0, SIMILAR_ADS_COUNT);
  createMarkers(slicedAds);
}

const renderAds = (ads) => {
  renderAllMarkers(ads);

  initMapFilter();

  const onFiltersChange = () => {
    let filteredData = filteredPins(ads);
    filteredData = filteredData.slice(0, SIMILAR_ADS_COUNT);
    createMarkers(filteredData);
  }

  const debouncedFilterChange = _.debounce(onFiltersChange, RERENDER_DELAY);
  filters.addEventListener('change', debouncedFilterChange);
}

getData(renderAds, showAlert);

export { mainMarker, resetMarkers, renderAds, createMarkers };
