import { useState, useEffect } from 'react'
import PhoneService from './services/numbers.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newPhone}
    const found = persons.find(e => e.name === newName)
    if (found) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        PhoneService.update(found.id, noteObject)
        .then(response => {
          PhoneService.getAll()
          .then(response => {
              setPersons(response)
            }
        )})
      }
      setNewName('')
      setNewPhone('')
    } else {
    PhoneService.create(noteObject)
    .then(response => {
      setPersons(persons.concat(response))
      setNewName('')
      setNewPhone('')
    })
    }
  }

  const deleteName = (event) => {
    event.preventDefault()
    if (window.confirm(`Delete ${event.target.name} ?`)) {
    PhoneService.deletePhone(event.target.id)
    .then(response => {
      PhoneService.getAll()
      .then(response => {
          setPersons(response)
        })
    })}
  }

  useEffect(() => {
    console.log('effect')
    PhoneService.getAll()
    .then(response => {
        console.log('promise fulfilled')
        console.log(response)
        setPersons(response)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  var filtered = function(person) {
    return person.name.toLowerCase().includes(newFilter.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone} handlePhoneChange={handlePhoneChange}/>
      <h3>Numbers</h3>
      <Persons deleteName={deleteName} persons={persons.filter(filtered)}/>
    </div>
  )
}

const Filter = (props) => {
  return (
  <div>
    filter shown with
    <input value={props.newFilter} onChange={props.handleFilterChange} />
  </div>
  )
}

const PersonForm = (props) => {
  return (
      <form onSubmit={props.addName}>
      <div>
        name: 
        <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: 
        <input value={props.newPhone} onChange={props.handlePhoneChange} />
      </div>
      <button type="submit">add</button>
    </form>
  )
}

const Persons = (props) => {
  return (
  props.persons.map(person => 
  <div 
  key={person.id}> {person.name} {person.number}
  <button onClick={props.deleteName} id={person.id} name={person.name}>delete</button>
  </div>
  )
  )
}

export default App
