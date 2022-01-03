import React from 'react'
import Person from './Person'

const PersonForm = (props) => {
  
  const {
    addPerson,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange,
    filteredName,
    filteredPersons,
    persons
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
          <h2>People:</h2>
          <ul>
          {filteredName === '' ?
            persons.map(person => 
              <Person key={Math.random()} person={person} />
            ) :
            filteredPersons.map(person => 
              <Person key={Math.random()} person={person} />
            )
          }
          </ul>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
