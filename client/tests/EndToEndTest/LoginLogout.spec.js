export default {
  'Login a user': browser =>
    browser
      .url(process.env.BASE_URL)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('input[name=email]', 'bosun@yahoo.com')
      .setValue('input[name=password]', '123456')
      .click('button')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('.card')
      .assert.urlContains('documents')
      .click('#logOut')
      .assert.urlContains('')
      .end()
};
