const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Requires password as third argument: node mongo.js <password>')
	process.exit(1)
}

const password = process.argv[2]

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(
			`mongodb+srv://richard123:${password}@cluster0.4twt3.mongodb.net/test`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
				useCreateIndex: true,
			}
		)

		console.log(`MongoDB connected to: ${connect.connection.host}`)
	} catch (error) {
		console.error(`Error: ${error.message}`)
		process.exit(1)
	}
}

connectDB()

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)

// Find all persons when there arent any arguments after password
if (process.argv.length === 3) {
	console.log('Phonebook: ')
	Person.find({}).then((result) => {
		result.forEach((person) => {
			console.log(person.name, person.number)
		})
		mongoose.connection.close()
	})
}

if (process.argv.length > 3) {
	const name = process.argv[3]
	const number = process.argv[4]

	const person = new Person({ name, number })

	person.save().then((result) => {
		console.log(`added ${name} number ${number} to phonebook`)
		mongoose.connection.close()
	})
}
