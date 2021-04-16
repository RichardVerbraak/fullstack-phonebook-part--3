const { response } = require('express')

const errorHandler = (error, req, res, next) => {
	console.log(error.message, 'middleware')

	if (error.name === 'CastError') {
		return res.status(400).json({ error: 'Malformatted ID' })
	}

	if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message })
	}

	next(error)
}

module.exports = errorHandler
