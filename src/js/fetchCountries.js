export { fetchCountries };

const URL = 'https://restcountries.com/v3.1/name/';
const OPTIONS = 'fields=name,capital,population,flags,languages';

function fetchCountries(countryName) {
  return fetch(`${URL}${countryName}?${OPTIONS}`).then(response => {
    if (!response.ok) {
      throw new Error('Oops, there is no country with that name.');
    }
    return response.json();
  });
}
