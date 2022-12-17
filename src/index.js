import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('#search-box'),
};

refs.input.addEventListener('input', debounce(() => {
    
}, DEBOUNCE_DELAY));


function fetchCountries(name) {

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
// Notiflix.Notify.info('Cogito ergo sum');