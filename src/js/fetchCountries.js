export const fetchCountries = name => {
  const countryPromise = fetch(
    'https://restcountries.com/v2/all?fields=name,capital,population,flags,languages'
  );
  return countryPromise;
};
