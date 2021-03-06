import React from 'react'
import Person from './Person'
import Notification from './Notification'

const PersonForm = (props) => {
  
  const {
    addPerson,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange,
    filteredName,
    filteredPersons,
    persons,
    deletePerson,
    notification
  } = props

  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          <div>
            Name: <input 
              value={newName}
              onChange={handleNameChange}
            />
          </div>
          <div>
            Number: <input 
              value={newNumber}
              onChange={handleNumberChange}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      {notification && <Notification notification={notification} />}
      <div>
          <h3>People:</h3>
          {filteredName === '' ?
            persons.map(person => 
              <Person
                key={Math.random()}
                person={person}
                deletePerson={deletePerson}
              />
            ) :
            filteredPersons.map(person => 
              <Person
                key={Math.random()}
                person={person}
                deletePerson={deletePerson}
              />
            )
          }
        </div>
    </div>
  )
}

export default PersonForm
