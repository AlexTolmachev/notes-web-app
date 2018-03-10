import React, { Component } from 'react'
import './css/Note.css'

class Note extends Component {
  constructor(props) {
    super(props)

    this.deleteNoteHandler = this.deleteNoteHandler.bind(this)
  }

  deleteNoteHandler() {
    const { _id, deleteNote } = this.props

    deleteNote(_id)
  }

  render() {
    const {
      deleteNoteHandler,
      props: { name, content }
    } = this

    return (
      <div className="Note">
        <header className="Note_name">
          { name }
        </header>

        <main className="Note_content">
          { content }
        </main>

        <div className="Note_deleteButton" onClick={deleteNoteHandler}>
          &#x2716;
        </div>
      </div>
    )
  }
}

export default Note