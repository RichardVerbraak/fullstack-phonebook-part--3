import React from 'react'

const Form = ({ addPerson, addName, addNumber, newName, newNumber }) => {
	return (
		<form onSubmit={addPerson}>
			<div>
				name: <input value={newName} onChange={addName} />
			</div>
			<div>
				number: <input value={newNumber} onChange={addNumber} />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	)
}

export default Form
