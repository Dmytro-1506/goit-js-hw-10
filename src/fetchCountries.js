import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

export default function fetchCountries(countryName) {
    const allCountries = fetch('https://restcountries.com/v2/all?fields=name,capital,population,flags,languages');
    allCountries.then(
        response => {
            return response.json();
        }
    ).then(
        response => {
            let checkedCountryNames = [];
            const namesList = response.map(elem => elem.name.toLowerCase());
            namesList.map(elem => {
                countryNameCheck(elem, countryName, checkedCountryNames);
            });
            const newNamesList = countriesQuantityCheck(checkedCountryNames);
            const countriesToShow = getCountriesByNames(response, newNamesList);
            if (countriesToShow.length > 1) {
            let stringToHtml = [];
            countriesToShow.forEach(country => {
                createCountryItem(country, stringToHtml);
            });
                refs.countryInfo.innerHTML = stringToHtml.toString();
            } else {
                refs.countryInfo.innerHTML = createOneCountry(countriesToShow[0]);
            }
            
        }
    ).catch(err => {
            console.log(err);
        })
}

function createOneCountry(country) {
    let leng = country.languages;
    let arrLeng = [];
    leng.map(elem => {
        arrLeng.push(elem.name);
    });
    return `<div class="one-counrty"><img class="one-flag" src="${country.flags.svg}" width="160" height="80"></img><span class="country-name">${country.name}</span><p class="item-info">Capital: ${country.capital}</p><p class="item-info">Population: ${country.population}</p><p class="item-info">Languages: ${arrLeng.join(', ')}</p></div>`
}

function createCountryItem(country, arrey) {
    arrey.push(`<div class="counrty-item"><img class="flag-svg" src="${country.flags.svg}" width="100" height="50"></img><span class="country-name">${country.name}</span></div>`);
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