require('dotenv').config();

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
      .end(),

  'A user can update his/her documents': (browser) => {
    browser
       .url(process.env.BASE_URL)
       .waitForElementVisible('body')
        .click('#document-container2')
         .waitForElementVisible('#myProfile', 5000)
      .click('#myProfile');
  }
}
;
