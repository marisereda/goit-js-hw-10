import '../css/styles.css';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import countryListTpl from '../templates/countryItem.hbs';
import countryCardTpl from '../templates/countryCard.hbs';
import { fetchCountries } from './fetchCountries';
import { getRefs } from './getRefs';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));
//----------------------------------------------

function onInputChange(event) {
  const target = event.target;
  const countryName = target.value.trim();
  clearSearchResult();

  if (!countryName) {
    return;
  }
  showCountries(countryName);
}
//----------------------------------------------

function showCountries(countryName) {
  fetchCountries(countryName)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (!data.length) {
        return;
      }
      renderCountries(data);
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}
//----------------------------------------------

function renderCountries(data) {
  if (data.length > 1) {
    insertMarkup(data, refs.countryListEl, countryListTpl);
  } else if (data.length === 1) {
    insertMarkup(data, refs.countryCardEl, countryCardTpl);
  }
}
//----------------------------------------------

function clearSearchResult() {
  refs.countryCardEl.innerHTML = '';
  refs.countryListEl.innerHTML = '';
}
//----------------------------------------------

function insertMarkup(data, refElement, template) {
  data.map(country => {
    const languagesList = Object.values(country.languages).join(', ');
    refElement.insertAdjacentHTML(
      'beforeend',
      template({ ...country, languagesList })
    );
  });
}
