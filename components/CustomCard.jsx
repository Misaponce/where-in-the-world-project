import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const CustomCard = ({ countryName, region, population, capital, flagSrc, flagAlt, countryCode}) => {
  return (
    <div className='card w-80 bg-base-100 shadow-xl m-3 h-full'>
      {/* country flag */}
      <Link href={`/country?countryCode=${countryCode}`}>
        <figure className='w-full overflow-hidden cursor-pointer'>
          <Image 
          src={flagSrc} 
          alt={`${flagAlt}-flag`} 
          className='object-cover group-hover:opacity-75'
          width={300}
          height={300}
          />
          {/* <img src={item.flags.svg} alt={`${item.name.official}-flag`} /> */}
        </figure>
      </Link>
      {/* Country Info */}
      <div className='card-body'>
        <h2 className='card-title font-bold'>
          {countryName}
        </h2>
        {/* Population */}
        <p className='text-lg'>
          <span className='font-semibold me-2'>
            Population: 
          </span> 
          {/* Formating using toLocaleString method */}
            {population.toLocaleString()} 
        </p>
        {/* Region */}
        <p className='text-lg'>
          <span className='font-semibold me-2'>
            Region: 
          </span> 
            {region}
        </p>
        {/* Capital */}
        <p className='text-lg'>
          <span className='font-semibold me-2'>
            Capital: 
          </span> 
            {capital}
        </p>

      </div>
    </div>
  )
}

export default CustomCard