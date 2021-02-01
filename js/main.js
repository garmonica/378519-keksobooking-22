'use strict';

const getRandomInteger = function (minNumber, maxNumber) {
  const randomInteger = Math.floor(Math.random() * maxNumber);
  return Math.abs(randomInteger);
};

getRandomInteger(-180, 180);

const getRandomDecimal = function (minNumber, maxNumber, decimalSymbols = 4) {
  const randomDecimal = (Math.random() * (maxNumber - minNumber) + minNumber).toFixed(decimalSymbols);
  return Math.abs(randomDecimal);
}

getRandomDecimal(-180, 180);
