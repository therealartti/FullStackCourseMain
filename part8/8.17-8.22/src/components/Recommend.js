import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FAV_GENRE } from './queries'
import { useState, useEffect } from 'react'


const Recommend = (props) => {
  const [genre, setGenre] = useState('')
  const genreResult = useQuery(ALL_BOOKS, { skip: !genre, variables: { genre: genre }})
  const favoriteResult = useQuery(FAV_GENRE)

  useEffect(() => {
    if (!favoriteResult.loading &&
        favoriteResult.data &&
        favoriteResult.data.me &&
        favoriteResult.data.me.favoriteGenre){
    setGenre(favoriteResult.data.me.favoriteGenre)}
  }, [favoriteResult.data, favoriteResult.loading])

  if (!props.show) {
    return null
  }

  if (favoriteResult.loading || genreResult.loading || !genre) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <b>{genre}</b></div>
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
    </div>)

}

export default Recommend