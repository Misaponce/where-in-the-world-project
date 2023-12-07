"use client"

import { fetchSingleCountrie } from '@/api/httpClient';
import Link from 'next/link'
import { Flag } from '@/components';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function page() {
  const [countryData, setCountryData] = useState([]);
  const searchParams = useSearchParams()
  const countryCode = searchParams.get('countryCode')

  const fetchCardData = async (code) => {
    try {
      const countryData = await fetchSingleCountrie(code);
      console.log(countryData);
      setCountryData(countryData)
    } catch(error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    const url = `${countryCode}`
      console.log(url);
      fetchCardData(url)
  },[countryCode])

  return (
    <div className='min-h-screen flex flex-col items-center justify-evenly'>
      <div className='self-start ms-3'>
        <Link href={'/countries'}>
          <button className='btn btn-outline m-4'>Back</button>
        </Link>
      </div>
      {countryData.map((country, index) => (
        <div key={index} className="card lg:card-side bg-base-100 shadow-xl w-auto">
          <Flag 
            src={country.flags.svg}
            alt={'Flag'}
            width={'50'}
            height={'30'}
          />
          <div className="card-body">
             {/* Country Name */}
             <div>
              <h2 className='card-title'>{country.name.common}</h2>
             </div>
             {/* Country Info */}
             <div>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <li>
                  <p>
                    <span>Official Name:</span>
                    {country.name.official}
                  </p>
                </li>
                <li>
                  <p>
                    <span>Population:</span>
                    {country.population.toLocaleString()}
                  </p>
                </li>
                <li>
                  <p>
                    <span>Region:</span>
                    {country.region}
                  </p>
                </li>
                <li>
                  <p>
                    <span>Sub Region:</span>
                    {country.subregion}
                  </p>
                </li>
                <li>
                  <p>
                    <span>Capital:</span>
                    {country.capital}
                  </p>
                </li>
                <li>
                  <p>
                    <span>Time Zone:</span>
                    {country.timezones}
                  </p>
                </li>
                <li>
                  <p>
                    <span>Currency:</span>
                    {Object.entries(country.currencies).map(([code, currency], index) => (
                      <ul key={index}>
                        <li>{currency.name}</li>
                        <li>{currency.symbol}</li>
                      </ul>
                    ))}
                  </p>
                </li>
                <li>
                  <p>
                    <span>Languages:</span>
                    {Object.entries(country.languages).map(([code, language], index) => (
                      <ul key={index}>
                        <li>{language}</li>
                      </ul>
                    ))}
                  </p>
                </li>
              </ul>
             </div>
             <div className='flex items-center'>
              <span>
                Border Countries:
              </span>
              {country.borders ? (country.borders.map((border, index) => (
                <div key={index} className='flex justify-center items-center'>
                  <button className='btn btn-outline m-1'>{border}</button>
                </div>
              ))
              ) : (
                <div className='flex justify-center items-center'>
                  <p>No Borders</p>
                </div>
              )
            }
             </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default page