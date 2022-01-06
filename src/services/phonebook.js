import axios from "axios"

// address of phonebook entries
const baseUrl = 'http://localhost:3001/persons'

// function to get all persons from server
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// function to add a new person to server
const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

// function to edit existing entry on server
const update = (id, newObject) => {
  const request =  axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

// function to delete an existing entry on server
const removeObject = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response)
}

export default {getAll, create, update, removeObject}
