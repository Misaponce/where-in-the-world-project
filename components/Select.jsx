import React from 'react'

const Select = () => {
  return (
    <select className="select w-full max-w-xs" defaultValue={"DEFAULT"}>
      <option disabled value={"DEFAULT"}>Filter by</option>
      <option value={"region"}>Region</option>
      <option value={"subregion"}>Subregion</option>
      <option value={"name"}>Name</option>
      <option value={"language"}>Language</option>
    </select>
  )
}

export default Select