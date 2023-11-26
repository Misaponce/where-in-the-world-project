import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">Where in the World!</h1>
          <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          <button className="btn btn-primary">
            <Link href={'/countries'}>Get Started</Link>
          </button>
        </div>
      </div>
    </div>
  )
}
