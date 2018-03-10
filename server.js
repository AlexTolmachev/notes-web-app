const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const { notes } = require('./routes')

const { PORT = 80 } = process.env

const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './build')))
app.use('/notes', notes)

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})