var config = require('../../../nightwatch.conf');
require('dotenv').config();

module.exports = { // adapted from: https://git.io/vodU0
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
  }
};
