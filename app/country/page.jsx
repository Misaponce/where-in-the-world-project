"use client"

import { fetchSingleCountrie } from '@/api/httpClient';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function page() {

  const [countryData, setCountryData] = useState([]);

  const cCode = '170';

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
    fetchCardData(cCode)
  },[])

  return (
    <div className='min-h-screen flex flex-col items-center justify-evenly'>
      <div className='self-start ms-3'>
        <Link href={'/countries'}>
          <button className='btn btn-outline m-4'>Back</button>
        </Link>
      </div>
      {countryData.map((country, index) => (
        <div key={index} className="card lg:card-side bg-base-100 shadow-xl w-auto">
          <figure><img src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album"/></figure>
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
                    <span>Native Name:</span>
                    {country.name.nativeName.spa.common}
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
                Border Countries
              </span>
              {country.borders.map((border, index) => (
                <div key={index} className='flex justify-center items-center'>
                  <button className='btn btn-outline m-1'>{border}</button>
                </div>
              ))}
             </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default page