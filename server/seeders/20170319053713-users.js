const bcrypt = require('bcrypt-nodejs');
module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [
      {
        userName: 'imizezek',
        firstName: 'Imisioluwa',
        lastName: 'Akande',
        email: 'imisioluwa.akande@andela.com',
        password: bcrypt.hashSync('imisioluwa.akande@andela.com', bcrypt.genSaltSync(8)),
        roleId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'kings',
        firstName: 'Kingdom',
        lastName: 'Isaac',
        email: 'kingdomisaac@yahoo.com',
        password: bcrypt.hashSync('kingdomisaac@yahoo.com', bcrypt.genSaltSync(8)),
        roleId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'skibo',
        firstName: 'Solomon',
        lastName: 'Kingsley',
        email: 'solomon@yahoo.com',
        password: bcrypt.hashSync('123456', bcrypt.genSaltSync(8)),
        roleId: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'Ann',
        firstName: 'Anu',
        lastName: 'Onifade',
        email: 'anu@yahoo.com',
        password: bcrypt.hashSync('123456', bcrypt.genSaltSync(8)),
        roleId: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'pfunky',
        firstName: 'Yinka',
        lastName: 'Alabi',
        email: 'pfunky@yahoo.com',
        password: bcrypt.hashSync('kingdomisaac@yahoo.com', bcrypt.genSaltSync(8)),
        roleId: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),
  down: queryInterface =>
    queryInterface.bulkDelete('Person', null, {})
};
