import React from 'react'
import Draggable from 'react-draggable'
import './styles/NoteStyle.css'

import { deleteNote } from '../service/Api'
import EditModal from './EditModal'

class Note extends React.Component {
  constructor () {
    super()
    this.state = {
      openModal: false
    }
  }

  getRandomColor () {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  handleDelete = (noteId) => {
    deleteNote(noteId)
    .then(() => console.log('La note a été supprimée'))
  }

  handleUpdate = (note) => {
    this.setState({openModal: true})
  }

  render () {
    const { note } = this.props
    return (
      note
        ? (
          <Draggable>
            <div className='note'>
              <div className='row'>
                <span className='title'>
                  <h2>{note.title}</h2>
                </span>
                <button onClick={() => this.handleDelete(note.id)}>🗑️</button>
                <button onClick={() => this.handleUpdate(note)}>✏️</button>
              </div>
              <div className='separator' />
              <span className='description'>
                {note.description}
              </span>
              <EditModal updateMode isOpen={this.state.openModal} note={note}/>
            </div>
          </Draggable>
        )
        : 'NO DATA'
    )
  }
}

export default Note
