const { Router } = require('express')
const { Note } = require('../db')

const router = Router()

router.get('/', async (req, res) => {
  try {
    const notes = await Note.find()

    res.status(200).json({
      response: notes
    })
  } catch (e) {
    res.status(500).json({
      error: `internal server error: ${e}`
    })

    console.error(e)
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, content } = req.body

    if (name === '' || content === '') {
      res.status(400).json({
        error: 'one of the required fields is empty'
      })

      return
    }

    const note = new Note({ name, content })
    const { _id, time } = await note.save()

    res.status(201).json({
      response: {
        _id,
        name,
        content,
        time
      }
    })
  } catch (e) {
    res.status(500).json({
      error: `internal server error: ${e}`
    })

    console.error(e)
  }
})

router.put('/', async (req, res) => {
  try {
    const { _id, name, content } = req.body
    const updatedData = {}

    if (!_id) {
      res.status(400).json({
        error: 'no _id provided, nothing to update'
      })

      return
    }

    if (!name && !content) {
      res.status(400).json({
        error: 'all updated values are empty'
      })

      return
    }

    if (name) {
      updatedData.name = name
    }

    if (content) {
      updatedData.content = content
    }
    
    await Note.findOneAndUpdate({ _id }, updatedData)

    res.status(200).json({
      response: {
        _id
      }
    })
  } catch (e) {
    res.status(500).json({
      error: `internal server error: ${e}`
    })

    console.error(e)
  }
})

router.delete('/', async (req, res) => {
  try {
    const { _id } = req.body

    if (!_id) {
      res.status(400).json({
        error: 'no _id provided, nothing to delete'
      })

      return
    }

    await Note.remove({ _id })

    res.status(200).json({
      response: {
        _id
      }
    })
  } catch (e) {
    res.status(500).json({
      error: `internal server error: ${e}`
    })

    console.error(e)
  }
})

module.exports = router