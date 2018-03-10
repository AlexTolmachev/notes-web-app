const mongoose = require('mongoose')
const { Schema } = mongoose
const { Note } = require('./models')

const { DB = 'notes'} = process.env

mongoose.promise = Promise
mongoose.connect(`mongodb://localhost:27017/${DB}`)

module.exports = {
  Note: mongoose.model('Note', new Schema(Note))
}