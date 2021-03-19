// const renderMarkers = (ads) => {
//   // функция создания меток на карте --- marker.addTo(map)
//   // и добавление соответствующих объявлений в балуны --- .bindPopup(getAdTemplate(point)):
//   const createMarkers = (arr) => {
//     arr.forEach((point) => {
//       const { location } = point;
//       marker(
//         {
//           lat: location.lat,
//           lng: location.lng,
//         },
//         {
//           icon: markerIcon,
//         })
//         .addTo(map)
//         .bindPopup(
//           getAdTemplate(point),
//           {
//             keepInView: true,
//           },
//         );
//     });
//   }
//   // функция создания всех 10-ти меток:
//   const renderAllAds = (arr) => {
//     const slicedAds = arr.slice(0, SIMILAR_ADS_COUNT);
//     createMarkers(slicedAds);
//   }
//   // сразу при загрузке данных рендерим все 10 меток:
//   renderAllAds(ads);
//   // удаление всех меток:
//   const resetMarkers = () => {
//     // тут надо, наверное, как-то оптимизировать, почитать документацию leaflet... не разобралась
//     // функция удаляет все слои, в том числе и изображения карты и главную метку!!!
//     // поэтому две последние строчки - заново добавление изображения карты и главной метки...хз
//     // вопрос - возможно ли интересно удалять ТОЛЬКО обычные метки
//     map.eachLayer(function (layer) {
//       map.removeLayer(layer);
//     });
//     mapLayer.addTo(map);
//     mainMarker.addTo(map);
//   }



//   // фильтрация ТИПА:
//   const onChangeType = () => {
//     resetMarkers();
//     if (housingType.value !== 'any') {
//       const filteredAds = ads.slice(0, SIMILAR_ADS_COUNT)
//         .filter((elem) => elem.offer.type === housingType.value);
//       createMarkers(filteredAds);
//       console.log(`Выбранный тип жилья - ${housingType.value}`);
//     }
//     if (housingType.value === 'any') {
//       renderAllAds(ads);
//       console.log('Выбран любой тип жилья');
//     }
//   }
//   housingType.addEventListener('change', onChangeType);

//   // фильтрация ЦЕНЫ:
//   const onChangePrice = () => {
//     resetMarkers();
//     if (housingPrice.value === 'middle') {
//       const filteredAds = ads.slice(0, SIMILAR_ADS_COUNT)
//         .filter((elem) => elem.offer.price >= 10000 && elem.offer.price <= 50000);
//       createMarkers(filteredAds);
//       console.log(`Выбранная цена - ${housingPrice.value}`);
//     }
//     if (housingPrice.value === 'low') {
//       const filteredAds = ads.slice(0, SIMILAR_ADS_COUNT)
//         .filter((elem) => elem.offer.price < 10000);
//       createMarkers(filteredAds);
//       console.log(`Выбранная цена - ${housingPrice.value}`);
//     }
//     if (housingPrice.value === 'high') {
//       const filteredAds = ads.slice(0, SIMILAR_ADS_COUNT)
//         .filter((elem) => elem.offer.price > 50000);
//       createMarkers(filteredAds);
//       console.log(`Выбранная цена - ${housingPrice.value}`);
//     }
//     if (housingPrice.value === 'any') {
//       renderAllAds(ads);
//       console.log('Выбрана любая цена');
//     }
//   }
//   housingPrice.addEventListener('change', onChangePrice);
//   // фильтрация КОМНАТ:
//   const onChangeRooms = () => {
//     resetMarkers();
//     if (housingRooms.value !== 'any') {
//       const filteredAds = ads.slice(0, SIMILAR_ADS_COUNT)
//         .filter((elem) => elem.offer.rooms === parseInt(housingRooms.value));
//       createMarkers(filteredAds);
//       console.log(`Выбранное число комнат - ${housingRooms.value}`);
//     }
//     if (housingRooms.value === 'any') {
//       renderAllAds(ads);
//       console.log('Выбрано любое число комнат');
//     }
//   }
//   housingRooms.addEventListener('change', onChangeRooms);

//   // фильтрация ГОСТЕЙ:
//   const onChangeGuests = () => {
//     resetMarkers();
//     if (housingGuests.value !== 'any') {
//       const filteredAds = ads.slice(0, SIMILAR_ADS_COUNT)
//         .filter((elem) => elem.offer.rooms === parseInt(housingGuests.value));
//       createMarkers(filteredAds);
//       console.log(`Выбранное число гостей - ${housingGuests.value}`);
//     }
//     if (housingGuests.value === 'any') {
//       renderAllAds(ads);
//       console.log('Выбрано любое число гостей');
//     }
//   }
//   housingGuests.addEventListener('change', onChangeGuests);


//   // фильтрация УДОБСТВ: ============================================================================
//   // ЭТО ПОКА ЧТО ХЗ КАК ДЕЛАТЬ.....((((

//   // const onChangeFeatures = () => {
//   //   resetMarkers();
//   //   if (featuresInputs.checked) {
//   //     const filteredAds = ads.slice(0, SIMILAR_ADS_COUNT)
//   //       .filter((elem) => elem.offer.features === featuresInputs.value);
//   //     createMarkers(filteredAds);
//   //     console.log(`Выбранно - ${featuresInputs.value}`);
//   //   }
//   // }
//   // housingFeatures.addEventListener('change', onChangeFeatures);



// };
