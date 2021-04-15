import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Message from './components/Message'
import Persons from './components/Persons'
import Search from './components/Search'

import './index.css'

import {
	getAllPersons,
	savePerson,
	deletePerson,
	updatePerson,
} from './services'

const App = () => {
	const [persons, setPersons] = useState([])

	const [filter, setFilter] = useState('')

	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

	const [message, setMessage] = useState()

	const filterPersons = (e) => {
		setFilter(e.target.value)
	}

	const addName = (e) => {
		setNewName(e.target.value)
	}

	const addPerson = (e) => {
		e.preventDefault()

		// Finds person with the same name and return said object
		const exists = persons.find((person) => {
			return person.name === newName
		})

		// If the person was found ? Alert : add to array
		if (exists) {
			const confirmed = window.confirm(
				`${exists.name} already exists in the phonebook, replace the old number with a new one?`
			)

			if (confirmed) {
				// Updated Person Object
				const updatedPerson = {
					name: exists.name,
					number: newNumber,
					id: exists.id,
				}

				// Create a new array where the newly updated person (data) replaces the old one by matching the IDs
				updatePerson(updatedPerson)
					.then((data) => {
						const updatedArray = persons.map((person) => {
							return person.id !== data.id ? person : data
						})
						setPersons(updatedArray)
					})
					.catch((error) => {
						setMessage({
							text: `Information of ${updatedPerson.name} has already been removed from the server`,
							success: false,
						})

						// Filter out person who was about to be updated but was already removed
						const filtered = persons.filter((person) => {
							return person.id !== updatedPerson.id
						})
						setPersons(filtered)
					})
			}
		} else {
			const person = { name: newName, number: newNumber }

			savePerson(person).then((savedPerson) => {
				setPersons([...persons, savedPerson])
			})

			setMessage({
				text: `Added ${newName}`,
				success: true,
			})
			setTimeout(() => {
				setMessage('')
			}, 5000)
		}
	}

	const removePerson = (id) => {
		deletePerson(id).then((persons) => {
			setPersons(persons)
		})
	}

	const addNumber = (e) => {
		setNewNumber(e.target.value)
	}

	useEffect(() => {
		getAllPersons().then((persons) => {
			setPersons(persons)
		})
	}, [])

	return (
		<div>
			<h2>Phonebook</h2>
			{message && <Message message={message} />}
			<Search filter={filter} filterPersons={filterPersons} />

			<h2>add a new</h2>
			<Form
				addPerson={addPerson}
				addName={addName}
				addNumber={addNumber}
				newName={newName}
				newNumber={newNumber}
			/>

			<h2>Numbers</h2>
			<Persons persons={persons} filter={filter} removePerson={removePerson} />
		</div>
	)
}

export default App
