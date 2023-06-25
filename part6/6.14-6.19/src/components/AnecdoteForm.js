import { useDispatch } from 'react-redux'
import { addPost } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
  
    const create = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        console.log('create', content)
        event.target.anecdote.value = ''
        dispatch(addPost(content))
        dispatch(setNotification(`you created '${content}'`, 10))
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