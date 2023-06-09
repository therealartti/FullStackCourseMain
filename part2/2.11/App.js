import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
    const noteObject = {
      name: newName,
      phone: newPhone}
    setPersons(persons.concat(noteObject))
    setNewName('')
    setNewPhone('')
    }
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons').then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
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
      <Persons persons={persons.filter(filtered)}/>
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
  <div key={person.name}> {person.name} {person.phone}</div>
  )
  )
}

export default App
