import axios from 'axios'

export const getAnecdotes = () =>
  axios.get('http://localhost:3001/anecdotes').then(res => res.data)


export const createAnecdote = newAnecdote =>
  axios.post('http://localhost:3001/anecdotes', newAnecdote).then(res => res.data)
  

export const updateVotes = async (newAnecdote) => {
    const AnecdoteId = newAnecdote.id
    const response = await axios.put(`http://localhost:3001/anecdotes/${AnecdoteId}`, newAnecdote)
    return response.data
}