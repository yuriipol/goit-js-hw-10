import './css/styles.css';
import Debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputFill = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
inputFill.addEventListener('input', Debounce(onInputSerch, DEBOUNCE_DELAY));

function onInputSerch(event) {
  event.preventDefault();

  console.log(event.target.value);

  const inputValue = event.target.value;
  const name = inputValue.trim();
  if ((name.length = '')) {
    return Notiflix.Notify.info('This field should not be empty');
  }
  clearContent();

  fetchCountries(name)
    .then(serchCountry => renderContent(serchCountry))
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function renderCountryList(countrys) {
  const markup = countrys
    .map(({ name, flags: { svg } } = {}) => {
      return `<li class="country">
            
            <img src = "${svg}" height="200" width="200"/>
            
          <p><b>Country</b>: ${name}</p>
        </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderContent(countrys) {
  if (countrys.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }
  if (countrys.length > 1) {
    renderCountryList(countrys);
    return;
  }
  renderCountry(countrys[0]);
}

function renderCountry({ name, flags: { svg } } = {}) {
  const countyContent = `  
          <img src = "${svg}" height="200" width="200"/>        
          <p><b>Country</b>: ${name}</p>
          <p><b>Country</b>: ${name}</p>
          <p><b>Country</b>: ${name}</p>`;

  countryInfo.innerHTML = countyContent;
}

function clearContent() {
  if (countryList.children.length > 0) {
    countryList.innerHTML = '';
  }

  if (countryInfo.children.length > 0) {
    countryInfo.innerHTML = '';
  }
}
