import React from 'react'
import ReactModal from 'react-modal'

import './styles/EditModalStyle.css'

import { createNote, updateNote } from '../service/Api'

import {
  Fab,
  Modal,
  Backdrop
} from '@material-ui/core'

import {
  Add
} from '@material-ui/icons'

class EditModal extends React.Component {
  constructor(props) {
    super()
    this.state = {
        id: props.note ? props.note.id : null,
        title: props.note ? props.note.title : '',
        description: props.note ? props.note.description : '',
        isOpen: undefined
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
        [event.target.name]: event.target.value
    })
  }

  handleOpenModal = () => {
      this.setState({isOpen: true})
  }

  handleCloseModal = () => {
      this.setState({isOpen: undefined})
      if (this.props.onCloseModal) {
        this.props.onCloseModal()
      }
  }

  handleSubmit = (event) => {
      event.preventDefault()
      if (this.props.updateMode) {
        updateNote(this.state)
        .then(() => {
          if (this.props.updateNotes) {
            this.props.updateNotes()
          }
          this.handleCloseModal()
        })
      } else {
        createNote(this.state)
        .then(() => {
          if (this.props.updateNotes) {
            this.props.updateNotes()
          }
          this.handleCloseModal()
        })
      }
  }

  render() {
    const { title, description, isOpen } = this.state
    const { updateMode } = this.props
    return (
        <div>
            {!updateMode ? <Fab style={{position: 'absolute', bottom: 20, right: 20}} onClick={this.handleOpenModal}><Add /></Fab> : null}
            <Modal
              open={isOpen || false}
              onClose={this.handleCloseModal}
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className='modal'
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
            <div className='content'>
                <button onClick={this.handleCloseModal} className="close-button">X</button>
                <form onSubmit={this.handleSubmit} className="form">
                    <label>Titre : </label>
                    <input name='title' onChange={this.handleChange} value={title} />
                    <label>Description : </label>
                    <input name='description' onChange={this.handleChange} value={description} />
                    <button type="submit" className="submit-button">{updateMode ? 'MODIFIER' : 'AJOUTER'}</button>
                </form> 
              </div>
            </Modal>
        </div>
    )
  }
}

export default EditModal
