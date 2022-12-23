import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

export default function fetchCountries(countryName) {
    const allCountries = fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`);
    allCountries.then(
        response => {
            return response.json();
        }
    ).then(
        response => {
            const countriesToShow = countriesQuantityCheck(response);
            if (response.message === 'Not Found') {
                return errorName();
            }
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
    let lenguages = country.languages;
    let names = country.name;
    let arrLeng = Object.values(lenguages);
    return `<div class="one-counrty"><img class="one-flag" src="${country.flags.svg}" width="160" height="80"></img><span class="country-name">${names.official}</span><p class="item-info">Capital: ${country.capital}</p><p class="item-info">Population: ${country.population}</p><p class="item-info">Languages: ${arrLeng.join(', ')}</p></div>`
}

function createCountryItem(country, arrey) {
    let names = country.name;
    arrey.push(`<div class="counrty-item"><img class="flag-svg" src="${country.flags.svg}" width="100" height="50"></img><span class="country-name">${names.official}</span></div>`);
}

function countriesQuantityCheck(arrey) {
    if (arrey.length > 10) {
        return toManyMatches();
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