import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconSuccess from '../img/icon-success.png';
import iconError from '../img/icon-error.png';


const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stateInputs = form.querySelectorAll('input[name="state"]');

const makePromise = ({ delayDuration, isFulfilledState }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFulfilledState) {
        resolve(`✅ Fulfilled promise in ${delayDuration}ms`);
      } else {
        reject(`❌ Rejected promise in ${delayDuration}ms`);
      }
    }, delayDuration);
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();

  const delayDuration = Number(delayInput.value);
  const isFulfilledState = [...stateInputs].find(input => input.checked).value === 'fulfilled';

  if (delayDuration < 0) {
    iziToast.error({
      title: 'Error',
      message: 'Number should be positive',
      backgroundColor: 'red',
      theme: 'dark',
      color: 'red',
      iconUrl: iconError,
      position: 'topRight',
    });
    return;
  }

  makePromise({ delayDuration, isFulfilledState })
    .then(value => {
      iziToast.show({
        title: 'Success',
        message: value,
        backgroundColor: 'green',
        theme: 'dark',
        color: 'green',
        iconUrl: iconSuccess,
        position: 'topRight',
      });
    })
    .catch(value => {
      iziToast.show({
        title: 'Error',
        message: value,
        backgroundColor: 'red',
        theme: 'dark',
        color: 'red',
        iconUrl: iconError,
        position: 'topRight',
      });
    });
});
