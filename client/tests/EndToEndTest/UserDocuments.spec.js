import faker from 'faker';

require('dotenv').config();

const username = faker.internet.username();
const password = faker.internet.password();


module.exports = {
  'User should be able see the homepage': (browser) => {
    browser
      .url(process.env.BASE_URL)
      .waitForElementVisible('#app')
      .assert.title('Doc Manager')
      .assert.containsText('.header', 'Amazing Facts!!!')
      .assert.containsText('div div div div div a', 'GET STARTED')
      .end();
  },
  'user should click': (browser) => {
    browser
      .url(process.env.BASE_URL)
      .waitForElementVisible('#app')
      .click('div div div div div a')
      .pause(10 * 1000)
      .end();
  },
  'User should be able to signup': (browser) => {
    browser
      .url(process.env.BASE_URL)
      .waitForElementVisible('#app')
      .waitForElementVisible('#Signup')
      .click('#Signup')
      .setValue('input[name=firstName]', faker.name.findName())
      .setValue('input[name=lastName]', faker.name.findName())
      .setValue('input[type=email]', faker.internet.email())
      .setValue('input[name=userName]', username)
      .setValue('input[type=password]', password)
      .setValue('input[name=confirmPassword]', password)
      .click('button')
      .waitForElementVisible('#doc-search', 3000)
      .end();
  },
  'Login a user': browser =>
    browser
      .url(process.env.BASE_URL)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('input[name=email]', 'bosun@yahoo.com')
      .setValue('input[name=password]', '123456')
      .click('button')
      .waitForElementVisible('body', 5000)
      .assert.containsText('#logo', 'smartDocx')
      .end(),

  'A user can update his/her documents': (browser) => {
    browser
       .url(process.env.BASE_URL)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('input[name=email]', 'bosun@yahoo.com')
      .setValue('input[name=password]', '123456')
      .click('button')
      .waitForElementVisible('#doc-search', 3000)
      .assert.containsText('#readmore', 'READ MORE')
      .waitForElementVisible('body', 5000)
      .click('#document-container2')
      .waitForElementVisible('#myDocuments', 5000)
      .click('#myDocuments')
      .waitForElementVisible('body', 5000)
      .click('#deleteButton')
      .waitForElementVisible('#promptDelete', 5000)
      .click('#promptDelete')
      .waitForElementVisible('#update', 3000)
      .click('#update')
      .assert.containsText('#editDocument h4', 'Edit Document')
      .setValue('input[name=title]', 'Andela is awesome')
      .click('#updateDocument')
      .end();
  }
};
