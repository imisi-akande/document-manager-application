// const config = require('../../../nightwatch.conf');
// require('dotenv').config();

// module.exports = {
//   'User should be able to signup': (browser) => {
//     browser
//       .url(process.env.BASE_URL)
//       .waitForElementVisible('#app')
//       .assert.containsText('div nav div a ul li li li a', 'Sign up')
//       .waitForElementVisible('body', 2000)
//       .assert.visible('Input[type=text]')
//       .setValue('Input[type=text]', true)
//       .assert.visible('Input[type=firstName]')
//       .setValue('Input[type=firstName]', 'Imisioluwa')
//       .assert.visible('Input[type=lastName]')
//       .setValue('Input[type=lastName]', 'Akande')
//       .assert.visible('Input[type=userName]')
//       .setValue('Input[type=userName]', 'imizezek')
//       .assert.visible('Input[type=email]')
//       .setValue('Input[type=email]', 'imisioluwa.akande@andela.com')
//       .assert.visible('Input[name=password]')
//       .setValue('Input[name=password]', '123456')
//       .assert.visible('Input[name=confirmPassword]')
//       .setValue('Input[name=confirmPassword]', '123456')
//       .click('.btn')
//       .pause(5000)
//       .assert.urlContains('documents')
//       .pause(5000)
//       // .pause(1000)
//       .end();
//   },
// };
