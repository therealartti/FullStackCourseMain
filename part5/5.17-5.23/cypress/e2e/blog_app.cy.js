describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Arthur Gerster',
            username: 'artti',
            password: 'fullstack'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('')
    })

    it('Login form is shown', function() {
        cy.contains('log in to application')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('artti')
            cy.get('#password').type('fullstack')
            cy.get('#login-button').click()
            cy.get('.success').contains('Successfully logged in')
        })
        it('fails with wrong credentials', function() {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
            cy.get('.error').contains('Wrong username or password')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            const userCreds = {
                username: 'artti',
                password: 'fullstack'
            }
            cy.login(userCreds)
        })

        it('a blog can be created', function() {
            cy.createBlog({ title: 'Title', author: 'Author', url: 'Url' })
            cy.contains('Title Author')
        })

        it('a blog can be liked', function() {
            cy.createBlog({ title: 'Title', author: 'Author', url: 'Url' })
            cy.get('.view-button').click()
            cy.get('.like-button').click()
            cy.contains('likes 1')
        })

        it('a blog can be deleted', function() {
            cy.createBlog({ title: 'Title', author: 'Author', url: 'Url' })
            cy.get('.view-button').click()
            cy.get('.delete-button').click()
            cy.visit('')
            cy.contains('Title Author').should('not.exist')
        })

        it('only the creator can see the delete button of a blog', function() {
            cy.createBlog({ title: 'Title', author: 'Author', url: 'Url' })
            cy.get('.view-button').click()
            cy.contains('remove')
            cy.get('#logout-button').click()
            const user = {
                name: 'Gerster Arthur',
                username: 'artti2',
                password: 'fullstack2'
            }
            cy.request('POST', 'http://localhost:3003/api/users/', user)
            cy.get('#username').type('artti2')
            cy.get('#password').type('fullstack2')
            cy.get('#login-button').click()
            cy.get('.view-button').click()
            cy.contains('remove').should('not.exist')
        })

        it('blogs are ordered according to likes', function() {
            cy.createBlog({ title: 'The title with the most likes', author: 'Author', url: 'Url' })
            cy.createBlog({ title: 'The title with the second most likes', author: 'Author2', url: 'Url2' })
            cy.createBlog({ title: 'The title with the third most likes', author: 'Author3', url: 'Url3' })
            cy.get('.blogs').find('.view-button').eq(2).click()
            cy.get('.blogs').find('.like-button').eq(2).click()
            cy.get('.blogs').find('.moreContent').eq(0).contains('likes 1')
            cy.get('.blogs').find('.view-button').eq(1).click()
            cy.get('.blogs').find('.like-button').eq(1).click()
            cy.get('.blogs').find('.moreContent').eq(1).contains('likes 1')
            cy.get('.blogs').find('.like-button').eq(1).click()
            cy.get('.blogs').find('.moreContent').eq(0).contains('likes 2')
            cy.get('.blogs').find('.like-button').eq(0).click()
            cy.get('.blogs').find('.moreContent').eq(0).contains('likes 3')
            cy.get('.blogs').find('.view-button').eq(2).click()
            cy.get('.blogs').find('.like-button').eq(2).click()
            cy.get('.blogs').find('.moreContent').eq(2).contains('likes 1')
            cy.get('.blogs').find('.like-button').eq(2).click()
            cy.get('.blogs').find('.moreContent').eq(1).contains('likes 2')
            cy.get('.blogs').find('.moreContent').eq(0).should('contain', 'The title with the most likes')
            cy.get('.blogs').find('.moreContent').eq(1).should('contain', 'The title with the second most likes')
            cy.get('.blogs').find('.moreContent').eq(2).should('contain', 'The title with the third most likes')
        })
    })
})