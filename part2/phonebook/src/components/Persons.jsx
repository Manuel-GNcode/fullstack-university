const Person = ({ name, number }) => <p>{name} {number}</p>

const Persons = ({ persons }) => {
  return (
    <div>
      {
        persons.length > 0
          ? persons.map(person => <Person key={person.id} name={person.name} number={person.number} />)
          : 'There are not numbers'
      }
    </div>
  )
}

export default Persons;