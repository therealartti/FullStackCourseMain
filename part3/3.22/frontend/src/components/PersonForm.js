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
  
  export default PersonForm