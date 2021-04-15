const mongoose = require('mongoose')
const connectDB = require('./config/db')
const Person = require('./models/Person')

connectDB()

// Find all persons when there arent any arguments after password
if (process.argv.length === 2) {
	console.log('Phonebook: ')
	Person.find({}).then((result) => {
		result.forEach((person) => {
			console.log(person.name, person.number)
		})
		mongoose.connection.close()
	})
}

if (process.argv.length > 3) {
	const name = process.argv[2]
	const number = process.argv[3]

	const person = new Person({ name, number })

	person.save().then((result) => {
		console.log(`added ${name} number ${number} to phonebook`)
		mongoose.connection.close()
	})
}
