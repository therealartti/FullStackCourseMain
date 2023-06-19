import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`Successfully logged in`)
      setTimeout(() => {setSuccessMessage(null)}, 3000)
    } catch (exception) {
      setErrorMessage(`Wrong username or password`)
      setTimeout(() => {setErrorMessage(null)}, 3000)
      setTimeout(() => {
      }, 5000)
    }}

  const handleCreate = async (event) => {
    event.preventDefault()
    
    try {
      await blogService.create({
        title, author, url
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      setSuccessMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {setSuccessMessage(null)}, 3000)
    } catch (exception) {
      setErrorMessage(`Failed creating ${title} by ${author}`)
      setTimeout(() => {setErrorMessage(null)}, 3000)
      setTimeout(() => {
      }, 5000)
    }}

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  

  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <div>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>   
    </div>   
  )

  const BlogForm = () => (
    <div>
    <h2>create new</h2>
    <form onSubmit={handleCreate}>
      <div>
        title:
          <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>   
    </div>   
  )

  const logOut = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }


  return (
    <div>
      {user === null && <div>
        <h2>log in to application</h2> 
        <Notification success={successMessage} error={errorMessage}/>
        {loginForm()}
        </div>}
      {user && <div>
        <h2>blogs</h2>
        <Notification success={successMessage} error={errorMessage}/>
       <p>{user.name} logged in
       <button onClick={logOut}>logout</button></p>
       {BlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>}
    </div>
  )
}

const Notification = ({ success, error }) => {
  if (success === null && error === null) {
    return null
  }
  else if (success === null && error !== null) {
    return (
      <div className='error'>
        {error}
      </div>
    )
  }
  else if (success !== null && error === null) {
    return (
      <div className='success'>
        {success}
      </div>
    )
  }
}

export default App