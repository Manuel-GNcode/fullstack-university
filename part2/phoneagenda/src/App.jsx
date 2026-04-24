import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '234-234234' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');

  const handleNewName = e => {
    setNewName(e.target.value)
  }
  const handleNewNumber = e => {
    setNewNumber(e.target.value)
  }

  const addNumber = e => {
    e.preventDefault()

    const isRepited = persons.some(person => person.name === newName);
    if (isRepited) {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    const newContact = {
      name: newName,
      number: newNumber
    }

    setPersons([...persons].concat(newContact));
    setNewName('');
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    </div>
  )
}

export default App