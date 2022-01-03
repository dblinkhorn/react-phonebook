import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')

  // get persons data from dev server
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        // and set as initial state
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (checkEmptyInput(newName)) {
      return
    }

    if (checkDuplicateName(newName)) {
      alert(`${newName} already exists.`)
      return
    }

    const newPersonObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newPersonObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilteredNameChange = (event) => {
    setFilteredName(event.target.value)
  }

  const checkEmptyInput = (input) => {
    if (input === '') {
      alert('Must enter a value.')
      return true
    }
  }

  const checkDuplicateName = (name) => {
    for (let person of persons) {
      if (name === person.name) {
        return true
      } return false
    }
  }

  const filteredPersons = persons.filter(person => {
    if (person.name
          .toLowerCase()
          .includes(filteredName)) {
      return person
    } return null
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filteredName={filteredName}
        handleFilteredNameChange={handleFilteredNameChange}
      />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        filteredName={filteredName}
        filteredPersons={filteredPersons}
        persons={persons}
      />
    </div>
  )
}

export default App