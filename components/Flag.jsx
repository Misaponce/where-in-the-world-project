import Image from 'next/image'
import React from 'react'

const Flag = ({ src, alt, }) => {
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill priority
      className='object-cover'
    />
  )
}

export default Flag