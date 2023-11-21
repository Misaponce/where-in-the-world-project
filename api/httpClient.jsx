  // API Im using: https://restcountries.com/#rest-countries

  // Endpoint
  //'https://restcountries.com/v3.1/all'

export async function fetchCountries(region) {
    const url = `https://restcountries.com/v3.1/region/${region}`

    try {
        const response = await fetch(url)

        if (response.ok) {
            const result = await response.json()
            // console.log(result);
            return result
          } else {
            console.error(`Failed to fetch data`)
          }
    } catch (error) {
        console.log(error)
    }
}