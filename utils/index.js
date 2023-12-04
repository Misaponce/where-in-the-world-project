// fetching countries by cioc code
export const generateCountryUrl = async (countryCode) => {
    const url = `https://restcountries.com/v3.1/alpha/${countryCode}`
    console.log(url);
    return url;
}
