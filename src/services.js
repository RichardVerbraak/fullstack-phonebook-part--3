import axios from 'axios'

// Relative path
const baseURL = '/api/persons'

const getAllPersons = () => {
	const request = axios.get(baseURL)
	return request.then((response) => {
		return response.data
	})
}

const savePerson = (person) => {
	const request = axios.post(baseURL, person)
	return request.then((response) => {
		return response.data
	})
}

// Doesnt return any data except the status of the request
const deletePerson = (id) => {
	const request = axios.delete(`${baseURL}/${id}`)
	return request.then((response) => {
		return response.data
	})
}

const updatePerson = ({ id, name, number }) => {
	const request = axios.put(`${baseURL}/${id}`, {
		name,
		number,
	})
	return request.then((response) => {
		return response.data
	})
}

export { getAllPersons, savePerson, deletePerson, updatePerson }
