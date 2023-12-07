import Image from 'next/image'
import React from 'react'

const Flag = ({ src, alt, width, height }) => {
  return (
    <figure className='w-full overflow-hidden cursor-pointer'>
        <Image src={src} alt={alt} width={width} height={height}/>
    </figure>
  )
}

export default Flag