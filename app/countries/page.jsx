"use client"

import { fetchCountries } from '@/api/httpClient'
import {useEffect, useState} from 'react'
import Image from 'next/image';
import { SearchForm, Select } from '@/components';

const page = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesData = await fetchCountries('North America')
        setData(countriesData)
        console.log(countriesData)
      } catch(error) {
        console.log(error)
      }
    };

    fetchData();
  }, [])

  return (
    <main>
      <div>
        {/* Search Menu */}
        <div className='search-container sm:flex sm:justify-between'>
          <div>
            <SearchForm />
          </div>
          <div>
            <Select />
          </div>
        </div>
        {/* Countries Data */}
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
      </div>
    </main>
  )
}

export default page