/* global L:readonly */
import { getAdTemplate } from './ad-item.js';
import { getData } from './api.js';
import { CITY_CENTER, initPage, address } from './user-form.js';
import { showAlert } from './util.js';

const SIMILAR_ADS_COUNT = 10;

const map = L.map('map-canvas')
  .on('load', () => {
    initPage();
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

const renderMarkers = (ads) => {
  ads.slice(0, SIMILAR_ADS_COUNT)
    .forEach((point) => {
      const { location } = point;
      const marker = L.marker(
        {
          lat: location.lat,
          lng: location.lng,
        },
        {
          icon: markerIcon,
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
}

getData(renderMarkers, showAlert);

export { mainMarker };
