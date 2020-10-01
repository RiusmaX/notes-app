import React from 'react'
import ReactModal from 'react-modal'

import { createNote, updateNote, getNotes } from '../service/Api'

class EditModal extends React.Component {
  constructor(props) {
    super()
    this.state = {
        id: props.note ? props.note.id : null,
        title: props.note ? props.note.title : '',
        description: props.note ? props.note.description : '',
        isOpen: props.isOpen
    }

    ReactModal.setAppElement('body')
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.updateMode && prevProps.isOpen !== prevState.isOpen) {
          this.setState({isOpen: prevProps.isOpen})
      }
  }

  handleChange = (event) => {
    this.setState({
        isOpen: true,
        [event.target.name]: event.target.value
    })
  }

  handleOpenModal = () => {
      this.setState({isOpen: true})
  }

  handleCloseModal = () => {
      this.setState({isOpen: false})
  }

  handleSubmit = (event) => {
      event.preventDefault()
      if (this.props.updateMode) {
        updateNote(this.state)
        .then(() => console.log('La note a été modifiée'))
      } else {
        createNote(this.state)
        .then(() => console.log('La note a été ajoutée'))
      }
  }

  render() {
    const { title, description, isOpen } = this.state
    const { updateMode } = this.props
    return (
        <div>
            {!updateMode ? <button onClick={this.handleOpenModal}>OPEN MODAL</button> : null}
            <ReactModal
                isOpen={isOpen}  
            >
                <form onSubmit={this.handleSubmit}>
                    <label>Titre : </label>
                    <input name='title' onChange={this.handleChange} value={title} />
                    <label>Description : </label>
                    <input name='description' onChange={this.handleChange} value={description} />
                    <button type="submit">{updateMode ? 'MODIFIER' : 'AJOUTER'}</button>
                </form> 
                <button onClick={this.handleCloseModal}>CLOSE MODAL</button>
            </ReactModal>
        </div>
    )
  }
}

export default EditModal
