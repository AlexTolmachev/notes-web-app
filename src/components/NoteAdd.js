import React, { Component } from 'react'
import './css/NoteAdd.css'

class NoteAdd extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newName: '',
      newContent: ''
    }

    this.addNoteHandler = this.addNoteHandler.bind(this)
    this.nameUpdateHandler = this.nameUpdateHandler.bind(this)
    this.contentUpdateHandler = this.contentUpdateHandler.bind(this)
  }

  nameUpdateHandler(e) {
    this.setState({
      newName: e.target.value
    })
  }

  contentUpdateHandler(e) {
    this.setState({
      newContent: e.target.value
    })
  }

  addNoteHandler() {
    const {
      props: { addNote },
      state: { newName, newContent }
    } = this

    addNote(newName, newContent)

    this.setState({
      newName: '',
      newContent: ''
    })
  }

  render() {
    const {
      state: { newName, newContent },
      nameUpdateHandler,
      contentUpdateHandler,
      addNoteHandler
    } = this

    return (
      <div className="NoteAdd">
        <input
          type="text"
          className="NoteAdd_name"
          value={newName}
          placeholder="Название заметки"
          onChange={nameUpdateHandler}
        />

        <textarea
          className="NoteAdd_content"
          value={newContent}
          placeholder="Текст заметки"
          onChange={contentUpdateHandler}
        />

        <button className="NoteAdd_addButton" onClick={addNoteHandler}>
          Добавить
        </button>
      </div>
    )
  }
}

export default NoteAdd