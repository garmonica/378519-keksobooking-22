const getRandomInteger = (minNumber, maxNumber) => {
  const randomInteger = Math.round((Math.random() * (maxNumber - minNumber) + minNumber));
  return Math.abs(randomInteger);
};

const getRandomDecimal = (minNumber, maxNumber, decimalSymbols = 5) => {
  const randomDecimal = (Math.random() * (maxNumber - minNumber) + minNumber);
  return Math.abs(randomDecimal).toFixed(decimalSymbols);
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const getRandomArray = (arr) => {
  const randomArray = new Array(getRandomInteger(0, arr.length - 1)).fill(null).map(() => getRandomArrayElement(arr));
  const result = [];
  for (let value of randomArray) {
    if (!result.includes(value)) {
      result.push(value);
    }
  }
  return result;
};

const showAlert = (message) => {
  const mapBlock = document.querySelector('.map');
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert-message');
  alertContainer.textContent = message;
  mapBlock.append(alertContainer);
}

const isEsc = (evt, cb) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    cb;
  }
}

export {getRandomInteger, getRandomDecimal, getRandomArrayElement, getRandomArray, showAlert, isEsc};
