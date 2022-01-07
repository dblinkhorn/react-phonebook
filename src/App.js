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
  const [notification, setNotification] = useState(null)

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

  // resets newName & newNumber state to be empty strings
  const resetForms = () => {
    setNewName('')
    setNewNumber('')
    return
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (checkEmptyInput(newName)) {
      return
    }

    if (checkDuplicateName(newName)) {
      if (checkDuplicateNumber(newNumber)) {
        // update state of notification
        setNotification(
          `${newName} already exists.`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        resetForms()
      } else {
        const [duplicatePerson] = persons.filter(person => person.name === newName)
        if (window.confirm(`${duplicatePerson.name} already exists. Do you want to replace the old number?`)) {
          const changedPerson = {...duplicatePerson, number: newNumber}

          phonebookService
            // replace given person on server with changedPerson
            .update(duplicatePerson.id, changedPerson)
            .then(returnedPerson => {
              // update state of notes with new array via map method
              // if the person id doesn't equal the id of the duplicatePerson
              // then set the person in the new array to equal the old person
              // otherwise set it to the new person with changed number
              setPersons(persons.map(person => person.id !== duplicatePerson.id ? person : returnedPerson))
              resetForms()

              setNotification(
                `${newName}'s number updated.`
              )
              setTimeout(() => {
                setNotification(null)
              }, 5000)
          })
        } else {
          resetForms()
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

        // update state of notification to display
        // confirmation of newly added user
        setNotification(
          `'${returnedPerson.name}' added.`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        resetForms()
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
        .catch(error => {
          setNotification(
            `'${person.name}' already removed.`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })

        // update state of notification to display
        // confirmation of newly removed user
        setNotification(
          `'${person.name}' removed.`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)

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
        notification={notification}
      />
    </div>
  )
}

export default App