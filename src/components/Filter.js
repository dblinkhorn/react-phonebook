import React from 'react'

const Filter = (props) => {

  const { filteredName, handleFilteredNameChange } = props

  return (
    <div>
      Filter People:
      <input 
        value={filteredName}
        onChange={handleFilteredNameChange}
      />
    </div>
  )
}

export default Filter
