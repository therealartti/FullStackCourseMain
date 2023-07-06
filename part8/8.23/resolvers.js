const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Author: {
      bookCount: async (root) => Book.collection.countDocuments({author: root._id})
    },
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
          if (!args.author && !args.genre) {
              return Book.find({}).populate('author')
          }
          if (!args.genre) {
              console.log(args.author)
              return Book.find({author: args.author}).exec() //not required to work (see 8.14)
          }
          if (!args.author) {
              return Book.find({"genres": {$in: [args.genre]}}).populate('author').exec()
          }
          return Book.find({author: args.author, "genres": {$in: [args.genre]}}).exec() //not required to work (see 8.14)
      },
      allAuthors: async () => Author.find({}),
      me: (root, args, context) => {
          return context.currentUser}
    },
    Mutation: {
      addBook: async (root, args, context) => {
        if (!context.currentUser){
          return null
        }
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author })
          try {
          await author.save()
          } catch (error) {
              throw new GraphQLError('Adding author failed', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.author,
                  error
                }
              })
            }
        }
        const book = new Book({ ...args, author: author._id })
        try {
          await book.save()
        } catch (error) {
          throw new GraphQLError('Adding book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      },
      editAuthor: async (root, args, context) => {
          if (!context.currentUser){
              return null
          }
          const updatedAuthor = await Author.findOneAndUpdate(
              { name: args.name }, { born: args.setBornTo }, { new: true }
          )
          return updatedAuthor
      },
      createUser: async (root, args) => {
          const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
          return user.save()
      },
      login: async (root, args) => {
          const user = await User.findOne({ username: args.username })
      
          if ( !user || args.password !== 'secret' ) {
            throw new GraphQLError('wrong credentials', {
              extensions: {
                code: 'BAD_USER_INPUT'
              }
            })        
          }
      
          const userForToken = {
            username: user.username,
            id: user._id,
          }
      
          return { value: jwt.sign(userForToken, JWT_SECRET) }
      }
    },
    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
      },
}

module.exports = resolvers