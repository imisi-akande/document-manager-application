require('dotenv').config();

export default {

  'Invalid Login': browser =>
    browser
      .url(process.env.BASE_URL)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('input[name=email]', 'andela@andela.com')
      .setValue('input[name=password]', 'TIA')
      .click('button')
      .waitForElementVisible('#password', 5000)
      .end(),

  'Login a user': browser =>
    browser
      .url(process.env.BASE_URL)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('input[name=email]', 'bosun@yahoo.com')
      .setValue('input[name=password]', '123456')
      .click('button')
      .waitForElementVisible('body', 5000)
      .end(),
}
;
