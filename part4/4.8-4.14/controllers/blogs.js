const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })

blogsRouter.post('/', async (request, response) => {
  if (!request.body.likes){
    request.body.likes = 0
  }
  if (!request.body.title || !request.body.url) {
    response.status(400).json("Bad request")
  } else {
    const blog = new Blog(request.body)

    const blogs = await blog.save()
    response.status(201).json(blogs)}
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogs = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).json(blogs)
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  const blogs = await Blog.findByIdAndUpdate(request.params.id, { likes })
  response.status(204).json(blogs)
})

module.exports = blogsRouter