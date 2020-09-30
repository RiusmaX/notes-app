import React from 'react'

import NoteList from '../component/NoteList'
import EditModal from '../component/EditModal'

class RootContainer extends React.Component {
  render () {
    return (
      <div>
        <EditModal />
        <NoteList />
      </div>
    )
  }
}

export default RootContainer
