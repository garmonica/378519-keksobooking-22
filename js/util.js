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
  alertContainer.style.zIndex = 900;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '18px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#ff6d51';
  alertContainer.style.color = '#353535';
  alertContainer.textContent = message;
  mapBlock.append(alertContainer);
}

export {getRandomInteger, getRandomDecimal, getRandomArrayElement, getRandomArray, showAlert};
