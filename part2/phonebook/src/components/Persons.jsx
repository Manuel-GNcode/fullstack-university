const Person = ({ name, number, deleteNumber }) => {
  return (
    <div>
      {name} {number}
      <button onClick={deleteNumber}>Delete</button>
    </div>
  )
}

const Persons = ({ persons, deleteNumber }) => {
  return (
    <div>
      {
        persons.length > 0
          ? persons.map(person => <Person deleteNumber={() => deleteNumber(person.id)} key={person.id} name={person.name} number={person.number} />)
          : 'There are not numbers'
      }
    </div>
  )
}

export default Persons;