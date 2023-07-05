import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import { EDIT_AUTHOR, ALL_AUTHORS } from './queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [setBornTo, setBorn] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const [ updateAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('update author...')
    updateAuthor({  variables: { name, setBornTo } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
        <option label=" "></option>
          {result.data.allAuthors.map((a) => (
            <option key={a.name}>{a.name}</option>
          ))}
        </select>
        <div>
          born
          <input
            type="number"
            value={setBornTo}
            onChange={({ target }) => setBorn(parseInt(target.value, 10))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
