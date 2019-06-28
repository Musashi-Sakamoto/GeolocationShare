describe('ログインページ', () => {
    before(() => {
        cy.clearCookies()
    })

    it('ログインページへのリダイレクト', () => {
        cy.visit('/')
        cy.url().should('eq', 'http://localhost:8000/login')
    })

    it('必要な要素が表示されているか', () => {
        cy.get(`input[name='username']`).should('exist')
        cy.get(`input[name='password']`).should('exist')
    })

    it('サインアップページに移動', () => {
        cy.contains('Signup').click()
        cy.wait(500)
        cy.url().should('eq', 'http://localhost:8000/signup')
        cy.contains('Login').click()
    })

    it('テキストフィールド未入力', () => {
        cy.contains('Login').click()
        cy.contains('Username or Password should not be blank')
    })

    it('テキストフィールドに誤ったユーザー名を入力', () => {
        cy.get(`input[name='username']`).clear().type('dummy')
        cy.get(`input[name='password']`).clear().type('dummypass')
        cy.contains('Login').click()
        cy.contains('Incorrect username')
    })

    it('テキストフィールドに誤ったパスワードを入力', () => {
        cy.get(`input[name='username']`).clear().type('username1')
        cy.get(`input[name='password']`).clear().type('password-dum')
        cy.contains('Login').click()
        cy.contains('Incorrect password')
    })

    it('ログイン成功', () => {
        cy.get(`input[name='username']`).clear().type('username1')
        cy.get(`input[name='password']`).clear().type('password')
        cy.contains('Login').click()
        cy.wait(500)
        cy.url().should('eq', 'http://localhost:8000/')
    })
})