const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')
const Person = require('./models/Person')

const app = express()

connectDB()

app.use(cors())

morgan.token('person', (req, res) => {
	return JSON.stringify(req.body)
})

app.use(
	morgan(
		':method :url :status :res[content-length] - :response-time ms :person'
	)
)

app.use(express.json())

app.get('/api/persons', (req, res) => {
	Person.find({}).then((persons) => {
		res.send(persons)
	})
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
		const person = new Person({
			name,
			number,
		})

		person.save().then((savedPerson) => {
			res.send(savedPerson)
		})
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

app.use(express.static('build'))

const PORT = process.env.PORT || 3001

app.listen(PORT)

console.log(`Server running on port ${PORT}`)
