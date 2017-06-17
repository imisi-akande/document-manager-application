import faker from 'faker';

export default {
  'Add Document': (client) => {
    const title = faker.lorem.word();
    client
       .url(process.env.BASE_URL)
      .waitForElementVisible('body')
       .click('#login')
     .setValue('input[name=email]', 'bosun@yahoo.com')
      .setValue('input[name=password]', '123456')
      .click('button')
      .waitForElementVisible('#document-container2', 5000)
      .click('#document-container2')
      .assert.urlContains('documents')
      .click('#create-doc')
      .waitForElementVisible('Input[name=title]')
      .setValue('Input[name=title]', title)
      .click('.mce-i-code')
      .setValue('.mce-textbox', faker.lorem.paragraph())
      .click('.mce-floatpanel .mce-container-body button')
      .waitForElementVisible('#add-docs')
      .click('#add-docs')
      .waitForElementVisible('.modal-close')
      .click('.modal-close')
      .waitForElementVisible('body')
      .assert.containsText('body', title)
      .end();
  },
  'View Document': (client) => {
    client
       .url(process.env.BASE_URL)
      .waitForElementVisible('body')
      .click('#login')
     .setValue('input[name=email]', 'bosun@yahoo.com')
      .setValue('input[name=password]', '123456')
      .click('button')
      .waitForElementVisible('.card')
      .assert.urlContains('documents')
      .waitForElementVisible('#readmore')
      .click('#readmore')
      .waitForElementVisible('.open')
      .end();
  },

  'Edit Document': (client) => {
    const title = faker.lorem.word();
    client
      .url(process.env.BASE_URL)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('input[name=email]', 'bosun@yahoo.com')
      .setValue('input[name=password]', '123456')
      .click('button')
      .waitForElementVisible('.card')
      .assert.urlContains('documents')
      .waitForElementVisible('#editButton')
      .click('#editButton')
      .assert.visible('.card-title')
      .clearValue('.card-title')
      .setValue('.card-title', title)
      .click('.mce-i-code')
      .setValue('.mce-textbox', faker.lorem.paragraph())
      .click('.mce-floatpanel .mce-container-body button')
      .waitForElementVisible('#updateButton')
      .click('#updateButton')
      .pause(2000)
      .waitForElementVisible('body')
      .pause(2000)
      .assert.containsText('body', title)
      .end();
  },
  'Delete Document': (client) => {
    let title;
    client
    .url(process.env.BASE_URL)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('input[name=email]', 'bosun@yahoo.com')
      .setValue('input[name=password]', '123456')
      .click('button')
      .waitForElementVisible('.card')
      .assert.urlContains('documents')
      .getText('.card-container2', function (docTitle) {
        title = docTitle;
        this.assert.containsText('body', title.value);
      })
      .waitForElementVisible('#deletebutton')
      .click('#deletebutton')
      .click('#noDelete')
      .pause(1000)
      .click('#deletebutton')
      .click('#promptDelete')
      .pause(1000)
      .getText('.card-container2', function (docTitle) {
        this.expect(docTitle.value).to.not.equal(title.value);
      })
      .end();
  }
// };
