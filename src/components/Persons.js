import React from 'react'

const Persons = ({ persons, filter, removePerson }) => {
	return (
		<div>
			{persons
				.filter((person) => {
					return person.name.toLowerCase().includes(filter.toLowerCase())
				})
				.map((person) => {
					return (
						<div key={person.id}>
							<span>{person.name}</span> <span>{person.number}</span>{' '}
							<button
								onClick={() => {
									if (window.confirm(`Delete ${person.name}?`)) {
										removePerson(person.id)
									}
								}}
							>
								delete
							</button>
						</div>
					)
				})}
		</div>
	)
}

export default Persons
