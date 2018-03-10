import React, { Component } from 'react'
import './css/NoteList.css'
import NoteAdd from './NoteAdd'
import Note from './Note'
import { baseUrl } from '../config'

class NoteList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: props.notes || []
    }

    this.addNote = this.addNote.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
    this.renderNotes = this.renderNotes.bind(this)
  }

  async componentWillMount() {
    try {
      const { response: notes } = await fetch(`${baseUrl}/notes`)
                                    .then(res => res.json())

      this.setState({ notes })
    } catch (e) {
      console.error(e)
    }
  }

  async deleteNote(deletedId) {
    try {
      const { notes } = this.state

      const { response } = await fetch(`${baseUrl}/notes`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id: deletedId
        })
      }).then(res => res.json())
      
      this.setState({
        notes: notes.filter(note => note._id !== deletedId)
      })
    } catch (e) {
      console.error(e)
    }
  }

  async addNote(name, content) {
    try {
      const { notes } = this.state

      const { response: newNote } = await fetch('/notes', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          content
        })
      }).then(res => res.json())

      this.setState({
        notes: [ ...notes, { ...newNote } ]
      })
    } catch (e) {
      console.error(e)
    }
  }

  renderNotes() {
    const {
      state: { notes },
      deleteNote
    } = this

    return notes.reverse().map((note, i) => (
      <Note key={note._id} {...note} deleteNote={deleteNote} />
    ))
  }

  render() {
    const { addNote, renderNotes } = this

    return (
      <div className="NoteList">
        <NoteAdd addNote={addNote} />
        {renderNotes()}
      </div>
    )
  }
}

export default NoteList