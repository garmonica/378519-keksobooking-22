/* global L:readonly */
/* global _:readonly */
import { renderAdItem } from './ad.js';
import { getData } from './api.js';
import { CITY_CENTER, initAdForm, initMapFilter, address } from './user-form.js';
import { showAlert } from './util.js';
import { filters, getFilteredPins } from './filter.js';

const SIMILAR_ADS_COUNT = 10;
const RERENDER_DELAY = 500;

const MAP_SCALE = 9;

const MAIN_MARKER_ICON_WIDTH = 52;
const MAIN_MARKER_ICON_HEIGHT = 52;
const MAIN_MARKER_ICON_ANCHOR_X = 26;
const MAIN_MARKER_ICON_ANCHOR_Y = 52;

const MARKER_ICON_WIDTH = 40;
const MARKER_ICON_HEIGHT = 40;
const MARKER_ICON_ANCHOR_X = 20;
const MARKER_ICON_ANCHOR_Y = 40;

const map = L.map('map-canvas')
  .on('load', () => {
    initAdForm();
  })
  .setView({
    lat: CITY_CENTER.lat,
    lng: CITY_CENTER.lng,
  }, MAP_SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarkerIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_MARKER_ICON_WIDTH, MAIN_MARKER_ICON_HEIGHT],
  iconAnchor: [MAIN_MARKER_ICON_ANCHOR_X, MAIN_MARKER_ICON_ANCHOR_Y],
});

const markerIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [MARKER_ICON_WIDTH, MARKER_ICON_HEIGHT],
  iconAnchor: [MARKER_ICON_ANCHOR_X, MARKER_ICON_ANCHOR_Y],
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
    let filteredData = getFilteredPins(ads);
    filteredData = filteredData.slice(0, SIMILAR_ADS_COUNT);
    createMarkers(filteredData);
  }

  const debouncedFilterChange = _.debounce(onFiltersChange, RERENDER_DELAY);
  filters.addEventListener('change', debouncedFilterChange);
}

getData(renderAds, showAlert);

export { mainMarker, resetMarkers, renderAds, createMarkers };
