import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('#search-box'),
};

refs.input.addEventListener('input', debounce(() => {
    let countryName = refs.input.value.trim().toLowerCase();
    console.log(countryName);
    fetchCountries(countryName).then(
        response => {
            let countriesList = response.json();
            console.log(countriesList);
            return countriesList;
        }
    ).then(
        response => {
            return response.map(elem=>elem.name.common.toLowerCase())
        }
    ).then(
        response => {
            console.log(response);
        })
}, DEBOUNCE_DELAY));


function fetchCountries(name) {
    const country = fetch('https://restcountries.com/v3.1/all');
console.log(country, name);
return country;
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

toManyMatches();
errorName();
fetchCountries(2).then(data => console.log(data.json()));