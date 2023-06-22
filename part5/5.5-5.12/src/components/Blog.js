import { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, setNewBlogs }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [view, setView] = useState(false)
    const hideWhenView = { display: view ? 'none' : '' }
    const showWhenView = { display: view ? '' : 'none' }

    const toggleView = () => {
        setView(!view)
    }

    const likePost = () => {
        blogService.updateLikes({ likes: blog.likes + 1 }, blog.id)
        setNewBlogs({ blog })
    }

    const deletePost = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            blogService.delPost(blog.id)
            setNewBlogs({ blog })
        }
    }

    return (
        <div style={blogStyle}>
            <div style={hideWhenView}>
                {blog.title} {blog.author}&nbsp;
                <button onClick={toggleView}>view</button>
            </div>
            <div style={showWhenView}>
                {blog.title} {blog.author}&nbsp;
                <button onClick={toggleView}>hide</button>
                <div>{blog.url}</div>
                <div>
                likes {blog.likes}&nbsp;
                    <button onClick={likePost}>like</button>
                </div>
                <div>{blog.user.name}</div>
                {user.username === blog.user.username && (<button id='delete-button' onClick={deletePost}>remove</button>)}
            </div>
        </div>
    )}


export default Blog
