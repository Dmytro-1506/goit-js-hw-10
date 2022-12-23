import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js'

const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(() => {
    refs.countryInfo.innerHTML = '';
    let countryName = refs.input.value.toLowerCase().trim();
    if (countryName) {
        fetchCountries(countryName);
    }
}, DEBOUNCE_DELAY));