const notFound = (req, res) => {
	res.status(404).send({ error: 'Route not found' })
}

module.exports = notFound
