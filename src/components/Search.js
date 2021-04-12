import React from 'react'

const Search = ({ filter, filterPersons }) => {
	return (
		<div>
			filter shown with <input value={filter} onChange={filterPersons} />
		</div>
	)
}

export default Search
