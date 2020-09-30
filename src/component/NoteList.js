import React from 'react'
import Note from './Note'

import './styles/NoteListStyle.css'

class NoteList extends React.Component {
  constructor () {
    super()
    this.state = {
      notes: []
    }
  }

  componentDidMount () {
    window.fetch('https://api.myidea.fr/v1/notes')
      .then(response => response.json())
      .then(result => this.setState({ notes: result }))
      .catch(error => window.alert(error))
  }

  render () {
    const { notes } = this.state
    return (
      <div className='list-container'>
        {
          notes
            ? (
              notes.map(note => {
                return <Note key={note.id} note={note} />
              })
            )
            : 'NO DATA'
        }
      </div>
    )
  }
}

export default NoteList
