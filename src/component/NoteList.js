import React from 'react'
import Note from './Note'

import { getNotes } from '../service/Api'

import './styles/NoteListStyle.css'

class NoteList extends React.Component {
  constructor () {
    super()
    this.state = {
      notes: []
    }
  }

  componentDidMount () {
    // this.update = setInterval(() => {
      getNotes()
      .then(data => this.setState({notes: data}))
    // }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.update)
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
