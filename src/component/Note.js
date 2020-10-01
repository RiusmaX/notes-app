import React from 'react'
// import Draggable from 'react-draggable'
import './styles/NoteStyle.css'

import { deleteNote, updateNote } from '../service/Api'
import EditModal from './EditModal'

import {
  Button
} from '@material-ui/core'

import {
  Visibility,
  VisibilityOff
} from '@material-ui/icons'


class Note extends React.Component {
  constructor () {
    super()
    this.state = {
      openModal: false
    }
    this.nodeRef = React.createRef();
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
    .then(() => {
      if (this.props.updateNotes) {
        this.props.updateNotes()
      }
    })
  }

  handleFavorite = (note) => {
    note.isFavorite = !note.isFavorite
    updateNote(note)
    .then(() => {
      if (this.props.updateNotes) {
        this.props.updateNotes()
      }
    })
  }

  handleArchive = (note) => {
    note.isEnabled = !note.isEnabled
    updateNote(note)
    .then(() => {
      if (this.props.updateNotes) {
        this.props.updateNotes()
      }
    })
  }

  handleUpdate = () => {
    this.setState({openModal: true})
  }

  handleCloseModal = () => {
    this.setState({openModal: undefined})
  }

  render () {
    const { note, updateNotes } = this.props
    return (
      note
        ? (
          // <Draggable nodeRef={this.nodeRef}>
            <div className='note' style={{backgroundColor: note.isEnabled ? 'gold' : 'lightgray'}} noderef={this.nodeRef}>
              <div className='row'>
                <Button onClick={() => this.handleDelete(note.id)}><span role="img" aria-label="delete">🗑️</span></Button>
                <Button onClick={() => this.handleFavorite(note)}><span role="img" aria-label="delete">{note.isFavorite ? '❤️' : '♡'}</span></Button>
                <Button onClick={() => this.handleUpdate(note)}><span role="img" aria-label="edit">✏️</span></Button>
              </div>
              <span className='title'>
                <h2>{note.title}</h2>
              </span>
              <div className='separator' />
              <span className='description'>
                {note.description}
              </span>
              <Button onClick={() => this.handleArchive(note)}><span role="img" aria-label="edit">{note.isEnabled ? <VisibilityOff /> : <Visibility />}</span></Button>
              <EditModal updateMode isOpen={this.state.openModal} note={note} updateNotes={updateNotes} onCloseModal={this.handleCloseModal} />
            </div>
          // </Draggable>
        )
        : 'NO DATA'
    )
  }
}

export default Note
