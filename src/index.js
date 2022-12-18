import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

function createCountryList(object) {
    let countriesArr = [];
    Object.values(object).map(elem => {
        const { name, flags } = elem;
        countriesArr.push(`<svg class="flag-svg" width="70" height="70"><use href="${flags.svg}"></use></svg><span class="country-name">${name.official}</span>`)
    });
    refs.countryList.innerHTML = countriesArr.toString();
}

refs.input.addEventListener('input', debounce(() => {
    let countryName = refs.input.value.trim().toLowerCase();
    getAllCountries(countryName);
}, DEBOUNCE_DELAY));

function getAllCountries(countryName) {
    const allCountries = fetch('https://restcountries.com/v2/all?fields=name,capital,population,flags,languages');
    allCountries.then(
        response => {
            return response.json();
        }
    ).then(
        response => {
            return response.map(elem => elem.name.toLowerCase());
        }
    ).then(
        response => {
            let checkedCountryNames = [];
            response.map(elem => {
                countryNameCheck(elem, countryName, checkedCountryNames);
            });
            let countriesQuantity = checkedCountryNames.length;
            if (countriesQuantity > 10) {
                toManyMatches();
            } else if (countriesQuantity === 0) {
                errorName();
            } else {
                return checkedCountryNames;
            }
        }
    ).then(
        response => {
            let countriesList = [];
            console.log(response);
        }
    ).catch(err => {
            console.log(err);
        })
}

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v2/all?fields=name,capital,population,flags,languages`);
    console.log(AllCountries);

//     https://restcountries.com/v2/{service}?fields={field},{field},{field}
//     https://restcountries.com/v3.1/name/{name}
//     name.official - полное имя страны
    // capital - столица
    // population - население
    // flags.svg - ссылка на изображение флага
    // languages - массив языков
}

function toManyMatches() {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
}

function errorName() {
    Notiflix.Notify.failure("Oops, there is no country with that name");
}

function countryNameCheck(country, name, newArr) {
    const chechedName = country.includes(name);
    if (chechedName) {
        newArr.push(country);
    }
}

toManyMatches();
errorName();
