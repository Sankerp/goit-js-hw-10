// live_LLOfWvOQROzdmcBGbAmEUMJtux608c3k51xLXh5kUnj1z3h6VE8QS2XmHBVo01w1;
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const elements = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

elements.select.addEventListener('change', handlerChange);

function handlerChange(event) {
  const breeds = event.target.value;
  elements.loader.hidden = false;
  elements.catInfo.hidden = true;
  elements.select.hidden = true;

  fetchCatByBreed(breeds)
    .then(data => {
      elements.catInfo.innerHTML = createMarkup(data);
    })
    .catch(error => {
      Notiflix.Report.failure(
        'Oops!',
        'Something went wrong! Try reloading the page!',
        'Ok'
      );
    })
    .finally(() => {
      elements.loader.hidden = true;
      elements.catInfo.hidden = false;
      elements.select.hidden = false;
    });
}

function createOptions() {
  elements.select.hidden = true;
  fetchBreeds()
    .then(data => {
      elements.select.innerHTML = data
        .map(
          elem => `
<option value="${elem.id}">${elem.name}</option>`
        )
        .join('');
      new SlimSelect({
        select: '#selectBreed',
        settings: {
          placeholderText: 'Сhoose a cat breed',
        },
      });
    })
    .catch(error => {
      Notiflix.Report.failure(
        'Oops!',
        'Something went wrong! Try reloading the page!',
        'Ok'
      );
    })
    .finally(() => {
      elements.loader.hidden = true;
      elements.error.hidden = true;
      elements.select.hidden = false;
    });
}
createOptions();

function createMarkup(array) {
  return array
    .map(({ url, breeds: [{ description, name, temperament }] }) => {
      return `<img src="${url}" alt="${name}" width="400"/>
    <h2>${name}</h2>
    <h3>Description</h3>
    <p class="descr">${description}</p>
    <h3>Temperament</h3>
    <p class="temperament">${temperament}</p>`;
    })
    .join('');
}
