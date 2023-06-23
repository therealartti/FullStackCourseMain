import { useSelector, useDispatch } from 'react-redux'
import { votePost } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.sort((a, b) => 
    a.votes - b.votes).reverse())
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log('vote', anecdote)
        dispatch(votePost(anecdote))
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