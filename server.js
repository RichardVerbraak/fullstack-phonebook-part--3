const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Mary Poppendick',
		number: '39-23-6423122',
	},
]

morgan.token('person', (req, res) => {
	return JSON.stringify(req.body)
})

app.use(
	morgan(
		':method :url :status :res[content-length] - :response-time ms :person'
	)
)

app.use(express.json())

app.use(express.static('/build'))

app.get('/api/persons', (req, res) => {
	res.send(persons)
})

app.get('/info', (req, res) => {
	const currentTime = new Date()

	res.send(
		`
        <div>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${currentTime}</p>
        </div>
        `
	)
})

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)

	const found = persons.find((person) => {
		return person.id === id
	})

	if (!found) {
		res.status(404)
		res.send('Not found')
	} else {
		res.status(200)
		res.send(found)
	}
})

app.post('/api/persons', (req, res) => {
	const { name, number } = req.body

	if (name && number) {
		const exists = persons.find((person) => {
			return person.name.toLowerCase() === name.toLowerCase()
		})

		if (!exists) {
			const id = Math.floor(Math.random() * 10000)

			const person = {
				id,
				name,
				number,
			}

			persons = [...persons, person]

			res.status(200)
			res.send(persons)
		} else {
			res.status(303)
			res.json({ error: 'User already exists' })
		}
	} else {
		res.status(404)
		res.json({ error: 'Name or number missing' })
	}
})

app.put('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	const { name, number } = req.body

	const foundPerson = persons.find((person) => {
		return person.id === id
	})

	if (foundPerson) {
		foundPerson.name = name
		foundPerson.number = number

		res.json(foundPerson)
	} else {
		res.status(404)
		res.json({ error: 'No user found' })
	}
})

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)

	const filtered = persons.filter((person) => {
		return person.id !== id
	})

	persons = filtered

	res.send(filtered)
})

const PORT = process.env.PORT || 3001

app.listen(PORT)

console.log(`Server running on port ${PORT}`)
