const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')
const Person = require('./models/Person')
const errorHandler = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')

// Init app
const app = express()

// Connect to MongoDB
connectDB()

// Cross origin resource so React works w/ backend on the same port
app.use(cors())

// Morgan showing the data from the req.body whenever a request is made
morgan.token('person', (req, res) => {
	return JSON.stringify(req.body)
})

app.use(
	morgan(
		':method :url :status :res[content-length] - :response-time ms :person'
	)
)

// Body parser
app.use(express.json())

//////////////////
//# Routes
//////////////////

// Fetch all persons
app.get('/api/persons', (req, res) => {
	Person.find({}).then((persons) => {
		res.send(persons)
	})
})

// Fetch info about the amount of persons in the phonebook && current time
app.get('/api/info', (req, res, next) => {
	const currentTime = new Date()

	Person.find({})
		.then((persons) => {
			res.status(200)
			res.send(
				`
			<div>
				<p>Phonebook has info for ${persons.length} people</p>
				<p>${currentTime}</p>
			</div>
			`
			)
		})
		.catch((error) => {
			next(error)
		})
})

// Fetch a single person
app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then((person) => {
			if (person) {
				res.status(200).send(person)
			} else {
				res.status(404).end()
			}
		})
		.catch((error) => {
			next(error)
		})
})

// Add a single person
app.post('/api/persons', (req, res, next) => {
	const { name, number } = req.body

	if (name && number) {
		const person = new Person({
			name,
			number,
		})

		person
			.save()
			.then((savedPerson) => {
				res.send(savedPerson)
			})
			.catch((error) => {
				next(error)
			})
	} else {
		res.status(400)
		res.json({ error: 'Name or number missing' })
	}
})

// Update a single person
app.put('/api/persons/:id', (req, res, next) => {
	const { name, number } = req.body

	// Set context to 'query' so the mongoose-unique package works with runValidators
	const options = { new: true, runValidators: true, context: 'query' }

	Person.findByIdAndUpdate(req.params.id, { name, number }, options)
		.then((person) => {
			if (person) {
				res.status(200)
				res.send(person)
			} else {
				res.status(404)
				res.json({ error: 'No user found' })
			}
		})
		.catch((error) => {
			next(error)
		})
})

// Delete a single person
app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then((result) => {
			res.status(204)
			res.end()
		})
		.catch((error) => {
			next(error)
		})
})

// Build static file from the build folder
app.use(express.static('build'))

// Not Found Route
app.use(notFound)

// Error handler
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT)

console.log(`Server running on port ${PORT}`)
