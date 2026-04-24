import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const [filtred, setFiltred] = useState(persons)

  const handleFilter = e => {
    const filter = e.target.value
    setNewFilter(filter)

    const personFiltred = persons.filter(person => {
      const name = person.name.toLowerCase();
      return name.includes(filter.toLowerCase());
    })
    setFiltred(personFiltred)
  }
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
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    setPersons([...persons].concat(newContact))
    setFiltred([...persons].concat(newContact))
    setNewFilter('')
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newValue={newFilter} onChange={handleFilter} />

      <h2>Add a new</h2>

      <PersonForm addNumber={addNumber} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />

      <h2>Numbers</h2>

      <Persons persons={filtred} />
    </div>
  )
}

export default App