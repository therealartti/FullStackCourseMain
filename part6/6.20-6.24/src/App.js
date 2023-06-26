import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, createAnecdote, updateVotes } from './requests'
import { useReducer } from 'react'
import NotifContext from './NotifContext'

const notifReducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case "ADD":
        return [`anecdote '${action.content}' added`, new Date().getTime()]
    case "VOTE":
        return [`anecdote '${action.content}' voted`, new Date().getTime()]
    case "RESET":
        return ''
    case "CUSTOM":
        return [action.content, new Date().getTime()]
    default:
        return state
  }
}

const App = () => {
  const [notif, notifDispatch] = useReducer(notifReducer, '')
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: (error) => {
      notifDispatch({type: "CUSTOM", 
      content: error.response.data.error})
    }
  })

  const voteAnecdoteMutation = useMutation(updateVotes, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
  }})

  const handleVote = (anecdote) => {
    console.log('vote')
    console.log(anecdote)
    voteAnecdoteMutation.mutate({content: anecdote.content, 
      votes: anecdote.votes + 1 , id: anecdote.id})
      notifDispatch({ type: "VOTE", content: anecdote.content})
  }

  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    {retry: 1}
  )
  console.log(result)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <NotifContext.Provider value={[notif, notifDispatch]}>
    <div>
      <h3>Anecdote app</h3>
    
      <Notification type="RESET"/>
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} 
      dispatch={notifDispatch} type="ADD"/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </NotifContext.Provider>
  )
}

export default App
