'use strict';

const getRandomInteger = function (min, max) {
  if (min >= 0 && max >= 0 && min <= max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
    return Math.round(randomInteger);
  }
}

getRandomInteger(0, 180);

const getRandomDecimal = function (min, max, decimalSymbols = 4) {
  if (min >= 0 && max >= 0 && min <= max) {
    const randomDecimal = (Math.random() * (max - min) + min).toFixed(decimalSymbols);
    return parseFloat(randomDecimal);
  }
}

getRandomDecimal(0, 180);
