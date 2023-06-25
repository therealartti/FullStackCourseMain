import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
      return state['anecdotes']
      .filter(item => item.content.toLowerCase()
      .includes(state['filter'].toLowerCase()))
      .sort((a, b) => b.votes - a.votes)})
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log('vote', anecdote)
        dispatch(voteFor(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
    }

    console.log(anecdotes)

    return(
        <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}
  
export default AnecdoteList