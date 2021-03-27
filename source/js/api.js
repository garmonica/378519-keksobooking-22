const GET_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://22.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(GET_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail('Ошибка загрузки данных!');
      }
    })
    .then((ads) => onSuccess(ads))
    .catch(() => {
      onFail('Ошибка загрузки данных!');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
