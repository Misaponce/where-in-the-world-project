const Select = ({ onChange, value }) => {

  return (
    <select 
      className="select select-bordered w-full max-w-xs" 
      value={value} 
      onChange={onChange}
      >
      <option disabled value={"Filter by Region"}>Filter by Region</option>
      <option value={"america"}>America</option>
      <option value={"europe"}>Europe</option>
      <option value={"africa"}>Africa</option>
      <option value={"asia"}>Asia</option>
      <option value={"oceania"}>Oceania</option>
    </select>
  )
}

export default Select