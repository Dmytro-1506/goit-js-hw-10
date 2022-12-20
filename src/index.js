import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

function createCountryItem(country) {
    refs.countryList.innerHTML = `<svg class="flag-svg" width="70" height="70"><use href="${country.flags.svg}"></use></svg><span class="country-name">${country.name}</span>`;
    console.log(country.flags.svg);
    console.log(country.name);
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
            console.log(response);
            let checkedCountryNames = [];
            const namesList = response.map(elem => elem.name.toLowerCase());
            namesList.map(elem => {
                countryNameCheck(elem, countryName, checkedCountryNames);
            });
            const newNamesList = countriesQuantityCheck(checkedCountryNames);
            const countriesToShow = getCountriesByNames(response, newNamesList);
            countriesToShow.forEach(country => {
                createCountryItem(country);
            });
        }
    ).then(
        response => {
            
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

function getCountriesByNames(allCountries, newNamesList) {
    let newCountriesList = [];
    newNamesList.map(name => {
        allCountries.forEach(object => {
            if (object.name.toLowerCase().includes(name)) {
                newCountriesList.push(object);
            }
        })
    })
    return newCountriesList;
}

function countriesQuantityCheck(arrey) {
    if (arrey.length > 10) {
        toManyMatches();
    } else if (arrey.length === 0) {
        errorName();
    } else {
        return arrey;
    }
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
