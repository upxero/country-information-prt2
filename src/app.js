import axios from 'axios';

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', searchCountry);

const countryInfoBox = document.getElementById('search-result');
const errorMessageBox = document.getElementById('error-message');

function searchCountry(e) {
    e.preventDefault();
    const queryfield = document.getElementById('query-field');
    fetchCountryDetails(queryfield.value);
    queryfield.value = '';
}

async function fetchCountryDetails(name) {
    countryInfoBox.innerHTML = ``;
    errorMessageBox.innerHTML = ``;

    try {
        const result = await axios.get(`https://restcountries.com/v2/name/${name}`);
        const country = result.data[0];
        console.log(country);

        countryInfoBox.innerHTML = `
      <article class="search-result-box">
        <span class="flag-title-container">
          <img src="${country.flag}" alt="vlag" class="flag">
          <h2>${country.name}</h2>
        </span>
        <p>${country.name} is situated in ${country.subregion}. It has a population of ${country.population} people</p>
        <p>The capital is ${country.capital} ${createCurrencyDescription(country.currencies)}</p>
      </article>
    `;
    } catch (e) {
        console.error(e);
        errorMessageBox.innerHTML = `
      <p class="error-message">${name} bestaat niet. Probeer het nogmaals.</p>
    `;
    }
}

function createCurrencyDescription(currencies) {
    let output = 'and you can pay with ';

    if (currencies.length === 2) {
        return output + `${currencies[0].name} and ${currencies[1].name}'s`;
    }

    return output + `${currencies[0].name}'s`;
}