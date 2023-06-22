import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import Blog from './Blog'

test('Title and author rendered, but not URL and likes', () => {
    const blog = {
        title: 'This is Title',
        author: 'This is Author',
        url: 'This is Url',
        likes: 101,
        user: { name: 'This is Name' }
    }

    const { container } = render(<Blog blog={blog} />)
    const div1 = container.querySelector('.initialContent')
    expect(div1).not.toHaveStyle('display: none')
    const div2 = container.querySelector('.moreContent')
    expect(div2).toHaveStyle('display: none')
    screen.debug()
})

test('URL and likes displayed after clicking', async () => {
    const blog = {
        title: 'This is Title',
        author: 'This is Author',
        url: 'This is Url',
        likes: 101,
        user: { name: 'This is Name' }
    }
    const { container } = render(<Blog blog={blog} />)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.moreContent')
    expect(div).not.toHaveStyle('display: none')
})

test('if the like button is clicked twice, the event handler is called twice', async () => {
    const blog = {
        title: 'This is Title',
        author: 'This is Author',
        url: 'This is Url',
        likes: 101,
        user: { name: 'This is Name' }
    }
    const mockHandler = jest.fn()
    render(<Blog blog={blog} setNewBlogs={mockHandler}/>)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})

test('BlogForm calls the event handler with the right details', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm handleCreate={createBlog} />)

    const inputs = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('create')

    await user.type(inputs[0], 'Title!')
    await user.type(inputs[1], 'Author!')
    await user.type(inputs[2], 'Url!')
    await user.click(sendButton)
    console.log(createBlog.mock.calls)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Title!')
    expect(createBlog.mock.calls[0][0].author).toBe('Author!')
    expect(createBlog.mock.calls[0][0].url).toBe('Url!')
})
