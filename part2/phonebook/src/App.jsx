import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import phoneService from './services/phone'
import Notification from './components/Notification'

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
  const [notification, setNotification] = useState({ message: null, succes: null })

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

  const handleNotification = (message, succes) => {
    setNotification({
      message,
      succes
    })

    setTimeout(() => {
      setNotification({ message: null, succes: null })
    }, 4000);
  }

  const addNumber = e => {
    e.preventDefault()

    const newContact = {
      name: newName,
      number: newNumber
    }

    const isRepited = persons.find(person => person.name === newName);
    if (isRepited) {
      if (window.confirm('is already added to phonebook, replace?')) {
        phoneService.update(isRepited.id, newContact)
          .then(phoneUpdated => {
            setPersons(persons.map(person => person.id === phoneUpdated.id ? phoneUpdated : person))
            handleNotification(`Updated ${phoneUpdated.name}`, true)
          })
      } else return
    }
    else {
      phoneService.create(newContact)
        .then(phoneReturned => {
          setPersons([...persons].concat(phoneReturned))
          handleNotification(`Added ${phoneReturned.name}`, true)
        })
    }

    setNewFilter('')
    setNewName('')
    setNewNumber('')
  }

  const deleteNumber = id => {
    const numberToDelete = persons.find(p => p.id === id)
    if (window.confirm('Delete ' + numberToDelete.name)) {
      phoneService.deleteById(id)
        .then(phoneDeleted => {
          setPersons(persons.filter(person => person.id !== phoneDeleted.id))
          handleNotification(`Deleted ${phoneDeleted.name}`, true)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} succes={notification.succes} />

      <Filter newValue={newFilter} onChange={handleFilter} />

      <h2>Add a new</h2>

      <PersonForm addNumber={addNumber} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />

      <h2>Numbers</h2>

      <Persons deleteNumber={deleteNumber} persons={newFilter ? filtred : persons} />
    </div>
  )
}

export default App