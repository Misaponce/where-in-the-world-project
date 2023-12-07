"use client"

import { fetchCountries } from '@/api/httpClient'
import {useEffect, useState} from 'react'
import { CustomCard, SearchForm, Select } from '@/components';

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
    <main className='flex flex-col items-center'>
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
              // Custom country card with it's props
              <CustomCard 
                key={index}
                flagSrc={item.flags.svg}
                flagAlt={item.name.official}
                countryName={item.name.official}
                capital={item.capital}
                region={item.region}
                population={item.population}
                countryCode={item.ccn3}
              />
            ))
          }
        </div>
        {/* Pagination Controls */}
        <div className="pagination flex items-center justify-center p-4">
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