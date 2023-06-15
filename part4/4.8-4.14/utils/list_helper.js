const logger = require('../utils/logger')
const _ = require('lodash')


const dummy = (blogs) => {
    return(1)
}

const totalLikes  = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog  = (blogs) => {
    const reducer = (fav, item) => {
        if (fav.likes > item.likes){
            return {
                title: fav.title,
                author: fav.author,
                likes: fav.likes}
        }
        return {
            title: item.title,
            author: item.author,
            likes: item.likes}
    }
    return blogs.reduce(reducer, {})
}

const mostBlogs = (blogs) => {
    if (!blogs.length) {
        return {}
    }
    const authors = _(blogs).groupBy('author').value()

    const mostCommonAuthor = _.head(_(blogs)
                    .countBy('author')
                    .entries()
                    .maxBy(_.last))
    const mostCommonAuthorCount = authors[mostCommonAuthor].length
    return {author: mostCommonAuthor, blogs: mostCommonAuthorCount }
}

const mostLikes = (blogs) => {
    if (!blogs.length) {
        return {}
    }
    const maxLikes = blogs.reduce((max, blog) => max.likes >= blog.likes ? max : blog)
    return {author : maxLikes.author, likes: maxLikes.likes}
}
  
module.exports = {
    dummy , totalLikes , favoriteBlog, mostBlogs , mostLikes 
}