import expect from 'expect';

require('dotenv').config();

export default {
  'Search a user': (browser) => {
    browser
      .url(process.env.BASE_URL)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('input[name=email]', 'bosun@yahoo.com')
      .setValue('input[name=password]', '123456')
      .click('button')
      .waitForElementVisible('#document-container1', 5000)
      .click('#document-container1')
      .waitForElementVisible('#allUsers', 5000)
      .click('#allUsers')
       .elements('css selector', '.user-rows', (collection) => {
         expect(collection.value.length).toBeGreaterThan(1);
       })
        .getText('.firstName', function (firstName) {
          this.waitForElementVisible('#doc-search');
          this.setValue('#doc-search', firstName.value);
        })
      .waitForElementVisible('.user-rows')
      .elements('css selector', '.user-rows', (collection) => {
        expect(collection.value.length).toEqual(1);
      })
      .end();
  },

  'Search a Document': (browser) => {
    browser
      .url(process.env.BASE_URL)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('input[name=email]', 'bosun@yahoo.com')
      .setValue('input[name=password]', '123456')
      .click('button')
      .waitForElementVisible('#document-container2', 5000)
      .click('#document-container2')
      .waitForElementVisible('#doc-search', 3000)
       .assert.urlContains('documents')
      .elements('css selector', '.card', (collection) => {
        expect(collection.value.length).toBeGreaterThan(1);
      })
      .getText('.card-title', function (docTitle) {
        this.waitForElementVisible('#doc-search');
        this.setValue('#doc-search', docTitle.value);
      })
      .end();
  }
};

