import React from 'react'

import NoteList from '../component/NoteList'
import EditModal from '../component/EditModal'

import { getNotes } from '../service/Api'

class RootContainer extends React.Component {
  constructor () {
    super()
    this.state = {
      notes: []
    }
  }

  componentDidMount () {
    this.updateNotes()
  }

  updateNotes = () => {
    getNotes()
    .then(data => this.setState({notes: data}))
  }

  render () {
    return (
      <div>
        <h3>Mes notes</h3>
        <NoteList notes={this.state.notes} updateNotes={this.updateNotes} noArchives />
        <h3>Mes notes archivées</h3>
        <NoteList notes={this.state.notes} updateNotes={this.updateNotes} archivesOnly />
        <EditModal updateNotes={this.updateNotes} />
      </div>
    )
  }
}

export default RootContainer
