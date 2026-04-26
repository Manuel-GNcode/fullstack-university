import { useState, useEffect } from 'react'
import axios from 'axios'

const Note = ({ note }) => {
  return <li>{note.content}</li>
}

const App = () => {
  const [notes, setNotes] = useState([])
  // const [newNote, setNewNote] = useState('')
  // const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get('http://localhost:3000/notes')
      .then(response => {
        setNotes(response.data)
      })
  }, [])

  return (
    <>
      <h1>Notes</h1>
      {notes.map(note => <Note key={note.id} note={note} />)}
    </>
  )
}

export default App;