import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconSuccess from '../img/icon-success.png'



const form = document.querySelector('.form');
const inputs = document.querySelectorAll('input');
const makePromise = ({ delay, shouldResolve }) => {
  if (delay >= 0) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve(`Fulfilled promise in ${delay}ms`);
        } else {
          reject(`Rejected promise in ${delay}ms`);
        }
      }, delay);
    });
  } else {
    return Promise.reject('Number should be positive');  
  }
};

const createOptions = () => {
  const options = {};
  const delayInput = form.elements['delay']; // Отримання введення затримки за атрибутом name
  options.delay = parseInt(delayInput.value); // Конвертація значення у числовий формат
  const stateInput = form.elements['state']; // Отримання введення стану за атрибутом name
  options.shouldResolve = stateInput.value === 'fulfilled'; // Перевірка, чи обрано "fulfilled"
  return options;
};


form.addEventListener('submit', event => {
  event.preventDefault();
  const options = createOptions();
  makePromise(options)
    .then(value =>
      iziToast.show({
        title: 'OK',
        message: value,
        backgroundColor: 'green',
        theme: 'dark',
        color: 'green',
        iconUrl: iconSuccess,
        position: 'topRight',
      })
    )
    .catch(value =>
      iziToast.show({
        title: 'OK',
        message: value,
        backgroundColor: 'red',
        theme: 'dark',
        color: 'red',
        iconUrl: iconSuccess,
        position: 'topRight',
      })
    );
});