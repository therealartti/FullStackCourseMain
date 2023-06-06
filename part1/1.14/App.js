import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(new Array(8).fill(0))

  const updateVotes = () => {
    const copy = [...voted]
    copy[selected] += 1
    console.log(copy)
    setVoted(copy)
  }

  const updateIndex = () => {
    const index = Math.floor(Math.random() * 8)
    setSelected(index)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {voted[selected]} votes</p>
      <Button handleClick={updateVotes} text='vote'/>
      <Button handleClick={updateIndex} text='next anecdote'/>
      <h1>Anecdote with the most votes</h1>
      <Most anecdotes={anecdotes} votes={voted}/>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Most = (props) => {
  const biggestIndex = props.votes.indexOf(Math.max(...props.votes))
  return (
    <div>
      <p>{props.anecdotes[biggestIndex]}</p>
      <p>has {props.votes[biggestIndex]} votes</p>
    </div>
  )
}

export default App
