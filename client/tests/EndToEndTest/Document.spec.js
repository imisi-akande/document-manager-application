import faker from 'faker';

const config = require('../../../nightwatch.conf');
require('dotenv').config();

const newTitle = faker.lorem.words(2);
const editedTitle = faker.lorem.words(2);

export default {
  'Read document': browser =>
    browser
      .url(process.env.BASE_URL)
      .waitForElementVisible('#app')
      .click('#login')
      .setValue('Input[name=email]', 'bosun@yahoo.com')
      .setValue('Input[name=password]', '123456')
      .click('button')
      .waitForElementVisible('#document-container2')
      .click('#document-container2')
      .waitForElementVisible('a[href="/documents"]')
      .pause(5000)
      .click('li a[href="/documents"]')
      .pause(5000)
      // .click('#read-more')
      .end(),

  'Create document': browser =>
    browser
      .url(process.env.BASE_URL)
      .waitForElementVisible('#app')
      .click('#login')
      .setValue('Input[name=email]', 'bosun@yahoo.com')
      .setValue('Input[name=password]', '123456')
      .click('button')
      .waitForElementVisible('#document-container2')
      .click('#document-container2')
      .waitForElementVisible('#create-doc')
      .click('#create-doc')
      .pause(3000)
      .waitForElementVisible('#mce.tiny')
      .setValue('Input[name=title]', newTitle)
      .click('select option[value="public"]')
       .click('#mce.tiny')
       .setValue('.mce-textbox', faker.lorem.paragraphs())
      .end()
};
