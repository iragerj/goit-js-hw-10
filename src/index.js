import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const debounceInput = debounce(onInput, DEBOUNCE_DELAY);

input.addEventListener('input', debounceInput);

function onInput(e) {
  const countryName = e.target.value.trim();

  if (countryName.length > 0) {
    clearHTML();

    fetchCountries(countryName)
      .then(response => {
        if (response.length > 10) {
          return Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }

        if (response.length >= 2) {
          showCountryList(response);
        } else {
          showCountryInfo(response);
        }
      })
      .catch(() => {
        return Notiflix.Notify.failure(
          'Oops, there is no country with that name'
        );
      });
  }
}

function getLanguages(languagesObj) {
  let langString = '';

  for (let key in languagesObj) {
    if (!langString) {
      langString = languagesObj[key];
    } else {
      langString = langString + ', ' + languagesObj[key];
    }
  }
  return langString;
}

function clearHTML() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function showCountryList(response) {
  let HTML = '';

  response.forEach(country => {
    const countryHTML = `<li><img src=${country.flags.svg}/><span>${country.altSpellings[1]}</span></li>`;
    HTML = HTML + countryHTML;
  });
  countryList.insertAdjacentHTML('afterbegin', HTML);
}

function showCountryInfo(response) {
  const country = response[0];
  const countryHTML = `<ul><li><img src=${country.flags.svg}/><span>${
    country.altSpellings[1]
  }</span></li><li><span>Capital: </span>${
    country.capital
  }</li><li><span>Population: </span>${
    country.population
  }</li><li><span>Languages: </span>${getLanguages(
    country.languages
  )}</li></ul>`;
  countryInfo.insertAdjacentHTML('afterbegin', countryHTML);
}
