const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username:1, name:1})
    response.json(blogs)
  })


blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  if (!request.body.likes){
    request.body.likes = 0
  }
  if (!request.body.title || !request.body.url) {
    response.status(400).json("Bad request")
  } else {
    const user = request.user
    console.log(user)
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: user.id
      })

    const savedBlog = await blog.save()
    console.log(savedBlog._id)
    user.blogs = user.blogs.concat(savedBlog._id.toString())
    await user.save()
    response.status(201).json(savedBlog)}
})


blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  console.log(user)
  const blog = await Blog.findById(request.params.id)
  console.log(blog)

  if ( blog && blog.user.toString() === user._id.toString() ){
    const blogs = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).json(blogs)
  } else {
    return response.status(401).json({ error: 'user and blog owner not matching' })
  }
})


blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  const blogs = await Blog.findByIdAndUpdate(request.params.id, { likes })
  response.status(204).json(blogs)
})

module.exports = blogsRouter