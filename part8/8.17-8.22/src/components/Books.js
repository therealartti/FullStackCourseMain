import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'
import { useState } from 'react'


const Books = (props) => {
  const [genre, setGenre] = useState('')
  const result = useQuery(ALL_BOOKS, { variables: { genre: "" }})
  const genreResult = useQuery(ALL_BOOKS, {variables: { genre: genre }})

  if (!props.show) {
    return null
  }

  if (result.loading || genreResult.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      {genre && <div>in genre <b>{genre}</b></div>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {genreResult.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {Array.from(new Set(result.data.allBooks.flatMap(book => book.genres)))
      .map(singleGenre => (<button key={singleGenre} onClick={()=>setGenre(singleGenre)}>{singleGenre}</button>))}
      <button onClick={()=>setGenre("")}>all genres</button>
    </div>
  )
}

export default Books
