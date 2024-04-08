import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// import errorIcon from '../img/icon-error.png'

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
  options.delay = inputs[0].value;
  options.shouldResolve = inputs[1].checked;
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
        iconUrl: '../img/icon-error.png',
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
        iconUrl: './icon-success.png',
        position: 'topRight',
      })
    );
});