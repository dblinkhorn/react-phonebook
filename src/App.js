import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import phonebookService from './services/phonebook'

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

  const checkDuplicateName = (name) => {
    for (let person of persons) {
      if (name === person.name) {
        return true
      } return false
    }
  }

  const checkDuplicateNumber = (number) => {
    for (let person of persons) {
      if (number === person.number) {
        return true
      } return false
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (checkEmptyInput(newName)) {
      return
    }

    if (checkDuplicateName(newName)) {
      if (checkDuplicateNumber(newNumber)) {
        alert(`${newName} already exists.`)
        return
      } else {
        console.log(persons);
        const [duplicatePerson] = persons.filter(person => person.name === newName)
        console.log(duplicatePerson);
        if (window.confirm(`${duplicatePerson.name} already exists. Do you want to replace the old number?`)) {
          const changedPerson = {...duplicatePerson, number: newNumber}
          console.log(changedPerson)

          phonebookService
            // replace given person on server with changedPerson
            .update(duplicatePerson.id, changedPerson)
            .then(returnedPerson => {
              // update state of notes with new array via map method
              // if the note id doesn't equal the function argument id
              // then set note in new array to equal old note
              // otherwise set it to the new note with changed important value
              return setPersons(persons.map(person => person.id !== duplicatePerson.id ? person : returnedPerson))
          })
        }
      }
      return
    }

    const newPersonObject = {
      name: newName,
      number: newNumber
    }

    // adds new person to server
    phonebookService
      .create(newPersonObject)
      .then(returnedPerson => {
        // adds post response to persons state
        setPersons(persons.concat(returnedPerson))
        // resets newName & newNumber state to be empty strings
        setNewName('')
        setNewNumber('')
      })
  }

  // toggles 'important' value of given note
  const deletePerson = (id) => {
    // get the person whose id matches the id passed as argument
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      phonebookService
        // replace given note on server with changeNote
        .removeObject(person.id)
      
      // update state to remove deleted person
      setPersons(persons.filter(person => person.id !== id))
    }
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

  const filteredPersons = persons.filter(person => {
    if (person.name
          .toLowerCase()
          .includes(filteredName)) {
      return person
    } return null
  })

  return (
    <div>
      <h2>React Phonebook</h2>
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
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App