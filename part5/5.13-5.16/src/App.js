import { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [newBlogs, setNewBlogs] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
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
            setSuccessMessage('Successfully logged in')
            setTimeout(() => {setSuccessMessage(null)}, 3000)
        } catch (exception) {
            setErrorMessage('Wrong username or password')
            setTimeout(() => {setErrorMessage(null)}, 3000)
            setTimeout(() => {
            }, 5000)
        }}


    const handleCreate = async (blogObject) => {
        try {
            await blogService.create(blogObject)
            blogFormRef.current.toggleVisibility()
            setSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
            setTimeout(() => {setSuccessMessage(null)}, 3000)
            setNewBlogs(blogObject)
        } catch (exception) {
            blogFormRef.current.toggleVisibility()
            setErrorMessage(`Failed creating ${blogObject.title} by ${blogObject.author}`)
            setTimeout(() => {setErrorMessage(null)}, 3000)
            setTimeout(() => {
            }, 5000)
        }}


    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs.sort((a, b) => a.likes - b.likes).reverse() )
        )

    }, [newBlogs])


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

    const logOut = async () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const blogFormRef = useRef()

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
                <p>{user.name} logged in&nbsp;
                    <button onClick={logOut}>logout</button></p>
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                    <BlogForm handleCreate={handleCreate}/>
                </Togglable>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} setNewBlogs={setNewBlogs}/>
                )}
            </div>
            }
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