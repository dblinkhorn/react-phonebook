
const Person = (props) => {
  const {person, deletePerson} = props
  return (
    <div>
      <li>{person.name}</li>
      <li>{person.number}</li>
      <button onClick={() => deletePerson(person.id)}>Delete</button>
      <p />
    </div>
  )
}

export default Person