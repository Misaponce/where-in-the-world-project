"use client"

import { fetchSingleCountrie } from '@/api/httpClient';
import Link from 'next/link'
import { Flag } from '@/components';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';

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
    <div className='min-h-screen flex flex-col items-center justify-evenly p-12'>
      <div className='w-full flex items-start mb-4'>
        <Link href={'/countries'}>
          <button className='btn btn-outline'>&larr; Back</button>
        </Link>
      </div>
      {/* Country Card */}
      {countryData.map((country, index) => (
      <div key={index} className='w-full flex flex-col md:flex-row md:items-center'>
        <div className='md:flex-1 h-72 relative overflow-hidden p-4'>
          <Image 
            src={country.flags.svg}
            alt={`${country.name.common}-flag`}
            fill priority
            className='object-contain'
          />
        </div>
        <div className='flex-1 p-4'>
            <div>
              <h2 className='card-title text-2xl my-4'>{country.name.common}</h2>
            </div>
            {/* Country Info */}
            <div>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <li>
                  <span>
                    <span className='me-2 font-bold'>Official Name:</span>
                    {country.name.official}
                  </span>
                </li>
                <li>
                  <span>
                    <span className='me-2 font-bold'>Population:</span>
                    {country.population.toLocaleString()}
                  </span>
                </li>
                <li>
                  <span>
                    <span className='me-2 font-bold'>Region:</span>
                    {country.region}
                  </span>
                </li>
                <li>
                  <span>
                    <span className='me-2 font-bold'>Sub Region:</span>
                    {country.subregion}
                  </span>
                </li>
                <li>
                  <span>
                    <span className='me-2 font-bold'>Capital:</span>
                    {country.capital}
                  </span>
                </li>
                <li>
                  <span>
                    <span className='me-2 font-bold'>Time Zone:</span>
                    {country.timezones}
                  </span>
                </li>
                <li>
                  <span className='flex'>
                    <span className='me-2 font-bold'>Currencies:</span>
                    {Object.entries(country.currencies).map(([code, currency], index) => (
                      <ul key={index} className=''>
                        <li>{currency.name}</li>
                      </ul>
                    ))}
                  </span>
                </li>
                <li>
                  <span className='flex'>
                    <span className='me-2 font-bold'>Languages:</span>
                    {Object.entries(country.languages).map(([code, language], index) => (
                      <ul key={index}>
                        <li>{language}</li>
                      </ul>
                    ))}
                  </span>
                </li>
              </ul>
            </div>
            {/* Borders container */}
            <div className='my-2'>
              <span className='me-2 font-bold'>
                Border Countries:
              </span>
              <div className='flex flex-wrap items-center'>
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
      </div>
      ))}
    </div>
  )
}

export default page