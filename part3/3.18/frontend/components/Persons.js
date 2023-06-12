const Persons = (props) => {
    return (
    props.persons.map(person => 
    <div key={person.name}> {person.name} {person.phone}</div>
    )
    )
  }
  
  export default Persons