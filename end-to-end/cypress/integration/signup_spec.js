describe('サインアップページ', () => {
    before(async () => {
        cy.clearCookies()
    })

    it('必要な要素が表示されているか', () => {
        cy.visit('/signup')
        cy.get(`input[name='email']`).should('exist')
        cy.get(`input[name='username']`).should('exist')
        cy.get(`input[name='password']`).should('exist')
        cy.get('button').contains('Signup').should('exist')
    })

    it('テキストフィールド未入力', () => {
        cy.contains('Signup').click()
        cy.contains('Username or Password should not be blank')
    })

    it('テキストフィールドに既に存在するユーザーを含める', () => {
        cy.get(`input[name='email']`).clear().type('musao@email.com')
        cy.get(`input[name='username']`).clear().type('username1')
        cy.get(`input[name='password']`).clear().type('password')
        cy.contains('Signup').click()
        cy.contains('User already exists')
    })

    it('成功時にフラッシュメッセージを表示', () => {
        cy.get(`input[name='email']`).clear().type('musssaso@emaila.com')
        cy.get(`input[name='username']`).clear().type('usernsssame1ss00')
        cy.get(`input[name='password']`).clear().type('password')
        cy.contains('Signup').click()
        cy.contains('Please confirm yourself in the email')
    })
})