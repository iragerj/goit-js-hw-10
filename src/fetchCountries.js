export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error('Not 2xx response');
    } else {
      return response.json();
    }
  });
}
