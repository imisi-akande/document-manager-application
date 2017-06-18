/* eslint-disable func-names */
import faker from 'faker';

export default {
  'Admin Add Role': (client) => {
    const newRole = faker.lorem.word();
    client
     .url(process.env.BASE_URL)
      .waitForElementVisible('body')
      .click('#login')
      .assert.visible('Input[type=email]')
     .setValue('input[name=email]', 'imisioluwa.akande@andela.com')
      .assert.visible('input[type=password]')
      .setValue('input[name=password]', 'imisioluwa.akande@andela.com')
      .click('.btn')
      .waitForElementVisible('#rolesButton', 4000)
      .waitForElementVisible('body', 3000)
      .waitForElementVisible('#rolesButton')
      .click('#rolesButton')
      .waitForElementVisible('#addRole', 5000)
      .click('#addRole')
      .waitForElementVisible('#submitRole', 5000)
      .setValue('input[name=title]', newRole)
      .click('#submitRole')
      .waitForElementVisible('body', 4000)
      .assert.containsText('body', newRole)
      .end();
  },

  'Admin Delete Role': (client) => {
    let roleToDelete;
    client
      .url(process.env.BASE_URL)
      .waitForElementVisible('body')
      .click('#login')
      .assert.visible('Input[type=email]')
      .setValue('input[name=email]', 'imisioluwa.akande@andela.com')
      .assert.visible('input[type=password]')
      .setValue('input[name=password]', 'imisioluwa.akande@andela.com')
      .click('.btn')
      .waitForElementVisible('#rolesButton', 4000)
      .waitForElementVisible('body', 3000)
      .waitForElementVisible('#rolesButton')
      .click('#rolesButton')
      .getText('.roleTitle', function (role) {
        roleToDelete = role.value;
        this.assert.containsText('body', roleToDelete);
      })
      .waitForElementVisible('#deleteRole')
      .click('#deleteRole')
      .waitForElementVisible('#promptDelete')
      .click('#promptDelete')
      .waitForElementVisible('body')
      .getText('.roleTitle', function (role) {
        this.expect(role.value).to.equal(roleToDelete);
      })
      .end();
  }
}
;

