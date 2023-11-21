"use client"

import { fetchCountries } from '@/api/httpClient'
import {useEffect, useState} from 'react'
import Image from 'next/image';
import { SearchForm, Select } from '@/components';

const page = () => {

  // State variable for region selected
  const [selectedFilter, setSelectedFilter] = useState('america');
  // State variable for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // State vatiable for data fetched
  const [data, setData] = useState([]);
  const itemsPerPage = 8;

  
  // Handling Region selected and setting page
  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value)
    setCurrentPage(1)
    // console.log(selectedFilter)
  }

  const fetchPageData = async (regionSelected, page) => {
    try {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;

      const countriesData = await fetchCountries(regionSelected);
      // Slicing data based on amount of items per page (8)
      const paginatedData = countriesData.slice(start, end);

      setData(paginatedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPageData(selectedFilter, currentPage);
  }, [selectedFilter, currentPage]);

  return (
    <main>
      <div>
        {/* Search Menu */}
        <div className='search-container p-10 sm:flex sm:justify-between'>
          <div className='m-4'>
            <SearchForm />
          </div>
          <div className='m-4'>
            <Select 
              onChange={handleFilterChange}
              value={selectedFilter}
            />
          </div>
        </div>
        {/* Countries Data */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-10'>
          {
            // Skeleton loader
            data === undefined ? 
              <div className="flex flex-col gap-4 w-96">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            :
            data.map((item, index) => (
              <div key={index} className='card w-80 bg-base-100 shadow-xl m-3 h-full'>
                {/* country flag */}
                <figure className='w-full overflow-hidden'>
                  <Image 
                  src={item.flags.svg} 
                  alt={`${item.name.official}-flag`} 
                  className='object-cover group-hover:opacity-75'
                  width={300}
                  height={300}
                  />
                  {/* <img src={item.flags.svg} alt={`${item.name.official}-flag`} /> */}
                </figure>
                {/* Country Info */}
                <div className='card-body'>
                  <h2 className='card-title font-bold'>
                    {item.name.official}
                  </h2>
                  {/* Population */}
                  <p className='text-lg'>
                    <span className='font-semibold me-2'>
                      Population: 
                    </span> 
                    {/* Formating using toLocaleString method */}
                      {item.population.toLocaleString()} 
                  </p>
                  {/* Region */}
                  <p className='text-lg'>
                    <span className='font-semibold me-2'>
                      Region: 
                    </span> 
                      {item.region}
                  </p>
                  {/* Capital */}
                  <p className='text-lg'>
                    <span className='font-semibold me-2'>
                      Capital: 
                    </span> 
                      {item.capital}
                  </p>

                </div>
              </div>
            ))
          }
        </div>
        {/* Pagination Controls */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
            disabled={currentPage === 1}
            className='btn btn-outline'
          >
            Previous
          </button>
          <span className='mx-4'>Page {currentPage}</span>
          <button
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            disabled={data.length < itemsPerPage}
            className='btn btn-outline'
          >
            Next
          </button>
        </div>
      </div>
    </main>
  )
}

export default page