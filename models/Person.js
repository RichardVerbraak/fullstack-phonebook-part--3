const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
	},
	number: {
		type: String,
		required: true,
		minlength: 8,
	},
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

personSchema.plugin(uniqueValidator)

const Person = mongoose.model('Person', personSchema)

module.exports = Person
