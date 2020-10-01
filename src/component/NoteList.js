import React from 'react'
import Note from './Note'

import './styles/NoteListStyle.css'

class NoteList extends React.Component {
  render () {
    const { notes, updateNotes, archivesOnly, noArchives } = this.props
    let _notes = notes
    if (archivesOnly) {
      _notes = notes.filter(note => !note.isEnabled)
    } else if (noArchives) {
      _notes = notes.filter(note => note.isEnabled)
    }
    return (
      <div className='list-container'>
        {
          notes
            ? (
              _notes.map(note => {
                return <Note key={note.id} note={note} updateNotes={updateNotes} />
              })
            )
            : 'NO DATA'
        }
      </div>
    )
  }
}

export default NoteList
