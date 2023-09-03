import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'center-top',
});

axios.defaults.headers.common['x-api-key'] =
  'live_tHnK3cijMbplCbl2Iknz6otGDLthJawXJlOY2JalCV2rkOgId4pJbY1Kz1otxil2';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener('change', selectCat);

error.style.display = 'none';

function fillCatList(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

function selectCat(e) {
  const breedId = e.target.value;
  if (breedId) {
    loader.style.display = 'block';
    catInfo.style.display = 'none';
    fetchCat(breedId);
  } else {
    loader.style.display = 'none';
  }
}

function fetchCat(breedId) {
  fetchCatByBreed(breedId)
    .then(response => {
      const cat = response;
      showCat(cat);
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Ooops! Something went wrong, please try to refresh the website.'
      );
      return error;
    })
    .finally(() => {
      loader.style.display = 'none';
    });
}

function showCat(cat) {
  const { name, description, temperament } = cat[0].breeds[0];
  const { url } = cat[0];
  const catInfoHTML = `
    <img class="catImg" src="${url}" alt="">
    <div class="description">
      <h2>${name}</h2>
      <p> ${description}</p>
      <p><strong>Temperament:</strong> ${temperament}</p>
  `;
  catInfo.style.display = 'inline-flex';
  catInfo.innerHTML = catInfoHTML;
}

function initCatApp() {
  loader.style.display = 'block';
  fetchBreeds()
    .then(breeds => {
      fillCatList(breeds);
      let select = new SlimSelect({
        select: breedSelect,
      });
      Notiflix.Notify.info(
        'Choose the breed form the list to get more information.'
      );
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      loader.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
  initCatApp();
});
