"use client"

import {useEffect, useState} from 'react'
import Image from 'next/image';

const API = () => {
  // API Im using: https://restcountries.com/#rest-countries

  // Endpoint
  //'https://restcountries.com/v3.1/all'


    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async (region) => {
        const url = `https://restcountries.com/v3.1/region/${region}`;

        try {
          const response = await fetch(url);

          if (response.ok) {
            const result = await response.json()
            // console.log(result);
            setData(result)
          } else {
            console.error(`Failed to fetch data`)
          }
        } catch(error) {
          console.error(error)
        }

      }

      fetchData('Northern Europe'); // Call the fetchData function to fetch data when the component mounts

    },[])

  return (
    <div>
      {
        data.map((item, index) => (
          <div key={index}>
            {/* country flag */}
            <div>
              <Image src={item.flags.svg} alt={`country-flag`} width={70} height={70} />
            </div>
            {/* Country Info */}
            <div>
              <h2 className='font-bold'>
                {item.name.official}
              </h2>
              {/* Population */}
              <p className='text-lg'>
                <span className='font-semibold'>
                  Population: 
                </span> 
                {/* Formating using toLocaleString method */}
                  {item.population.toLocaleString()} 
              </p>
              {/* Region */}
              <p className='text-lg'>
                <span className='font-semibold'>
                  Region: 
                </span> 
                  {item.region}
              </p>
              {/* Capital */}
              <p className='text-lg'>
                <span className='font-semibold'>
                  Capital: 
                </span> 
                  {item.capital}
              </p>

            </div>
          </div>
        ))
      }
    </div>
  )
}

export default API