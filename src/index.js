import './css/styles.css';
import Debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
const DEBOUNCE_DELAY = 300;

const inputFill = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
inputFill.addEventListener('input', Debounce(onInputSerch, DEBOUNCE_DELAY));

function onInputSerch(event) {
  event.preventDefault();
  console.log(event.target.value);
}

const name = 'U';
fetchCountries(name)
  .then(data => data.json())
  .then(countrys => countrys.filter(country => country.name.includes(name)))
  .then(serchCountry => console.log(serchCountry));

function renderCountry(countrys) {
  const markup = countrys
    .map(country => {
      return `<li>
            <svg width="200" height="200"
            <image href="${countrys.flags.svg}" height="200" width="200"/>
            </svg>
          <p><b>Country</b>: ${countrys.name}</p>
        </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

// function makeGallaryCountrys({
//   name,
//   capital,
//   population,
//   flags: { svg },
//   languages,
// } = {}) {
//   return `<li>
//             <svg width="200" height="200"
//             <image href="${svg}" height="200" width="200"/>
//             </svg>
//           <p><b>Country</b>: ${name}</p>
//         </li>`;
// }
// const gallaryCountrys = serchCountry.map(makeGallaryCountrys);
// countryList.insertAdjacentHTML('afterbegin', gallaryCountrys.join(''));
