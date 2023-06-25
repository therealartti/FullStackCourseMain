import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    votePost(state, action) {
      const id = action.payload.id
      const changedVote = action.payload
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedVote )
      },
    appendAnecdote(state, action) {
        state.concat(action.payload)
      },
    setAnecdotes(state, action) {
        return action.payload
      }
    },   
})


export const { votePost, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addPost = content => {
  return async dispatch => {
    const newPost = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newPost))
  }
}

export const voteFor = id => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToChange = anecdotes.find(anecdote => anecdote.id === id)
    
    const changedVote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }

    await anecdoteService.updateVotes(changedVote, id)
    dispatch(votePost(changedVote))
  }
}


export default anecdoteSlice.reducer