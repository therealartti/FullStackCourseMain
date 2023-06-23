import { useDispatch } from 'react-redux'
import { addPost } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
  
    const create = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        console.log('create', content)
        event.target.anecdote.value = ''
        dispatch(addPost(content))
      }
  
    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={create}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>)
}
  
export default AnecdoteForm