import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import phoneService from './services/phone'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filtred, setFiltred] = useState([])

  useEffect(() => {
    phoneService.getAll()
      .then(initialPhones => setPersons(initialPhones))
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
      name: newName,
      number: newNumber
    }

    phoneService.create(newContact)
      .then(phoneReturned => setPersons([...persons].concat(phoneReturned)))

    setNewFilter('')
    setNewName('')
    setNewNumber('')
  }

  const deleteNumber = id => {
    const numberToDelete = persons.find(p => p.id === id)
    if (window.confirm('Delete ' + numberToDelete.name)) {
      phoneService.deleteById(id)
        .then(phoneDeleted => setPersons(persons.filter(person => person.id !== phoneDeleted.id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newValue={newFilter} onChange={handleFilter} />

      <h2>Add a new</h2>

      <PersonForm addNumber={addNumber} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />

      <h2>Numbers</h2>

      <Persons deleteNumber={deleteNumber} persons={newFilter ? filtred : persons} />
    </div>
  )
}

export default App