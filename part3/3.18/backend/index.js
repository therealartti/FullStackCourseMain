require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()
const Phone = require('./models/phone.js')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :req[content-length] :response-time ms :body'))



let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response, next) => {
    Phone.find({}).then(phones => {
        response.json(phones)
      })
      .catch(error => next(error))
}) //

app.get('/info', (request, response) => {
    Phone.find({}).then(phones => {
        var datetime = new Date()
        var count = Object.keys(phones).length
        response.send(
            `<div>Phonebook has info for ${count} people</div>
            <br/>
            <div>${datetime}</div>`
        )

      })
      .catch(error => next(error))
}) //

app.get('/api/persons/:id', (request, response, next) => {
    Phone.findById(request.params.id)
    .then(phone => {
        if (phone) {
            response.json(phone)
          } else {
            response.status(404).end()
          }
        })
        .catch(error => next(error))
}) //

app.delete('/api/persons/:id', (request, response, next) => {
    Phone.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
}) //


  
app.post('/api/persons', (request, response, then) => {
    const body = request.body
    
    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'body or name are missing' 
        })
    } else if (persons.some(e => e.name === body.name)){
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }

    const person = new Phone({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => {
        response.json(savedPerson)
      })
      .catch(error => next(error))

}) //

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
        name: body.name,
        number: body.number
    }
  
    Phone.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPhone => {
        response.json(updatedPhone)
      })
      .catch(error => next(error))
  })

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else {
        return response.status(400).send({ error: error.name })
    }
  
    next(error)
}
  
app.use(errorHandler)