const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


test('there are two blogs and is JSON', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body)
    .toHaveLength(2)
}, 10000)

test('is JSON and has id defined', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  console.log(response.body[0].id)
  expect(response.body[0].id)
    .toBeDefined()
}, 10000)

test('successfully creates a new blog post', async () => {
  const response1 = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  const initialLength = response1.body.length
  const newBlog = {
    title: "String6",
    author: "String",
    url: "String",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const response2 =  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response2.body).toHaveLength(initialLength + 1)

}, 10000)

test('likes property defaults to 0 if missing', async () => {
  const newBlog = {
    title: "String6",
    author: "String",
    url: "String"
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toEqual(0)
}, 10000)

test('title and url property returns 400 if missing', async () => {
  const newBlog = {
    author: "String",
    likes: 10
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
}, 10000)

test('deleting a single blog post resource', async () => {
  const response1 = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  const blogId = response1.body[0].id

  await api
    .delete(`/api/blogs/${blogId}`)
    .expect(204)
}, 10000)

test('editing a single blog post resource', async () => {
  const response1 = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogId = response1.body[0].id
  const newBlog = {
    likes: 10
  }

  await api
    .put(`/api/blogs/${blogId}`)
    .send(newBlog)
    .expect(204)
}, 10000)

afterAll(async () => {
  await mongoose.connection.close()
})