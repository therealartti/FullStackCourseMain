import { useSelector, useDispatch } from 'react-redux'
import { votePost } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
      return state['anecdotes']
      .filter(item => item.content.toLowerCase()
      .includes(state['filter'].toLowerCase()))
      .sort((a, b) => b.votes - a.votes)})
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log('vote', anecdote)
        dispatch(votePost(anecdote))
        dispatch(notificationChange(`you voted '${anecdote.content}'`))
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