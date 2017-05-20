const faker = require('faker');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Documents', [
    {
      title: 'Digitized impactful Graphic Interface',
      content: `Cumque dolorum laborum sint id. Error cumque ipsa
      culpa est delectus dolores consequatur et laudantium.
      Est enim facilis ad occaecati iusto qui. Et rerum tempora eius et
      quae eveniet. Ut adipisci ut occaecati id assumenda nihil.
      Eos repudiandae est sed qui est sapiente temporibus dolorem.`,
      access: 'public',
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      authorId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      authorId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      authorId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      authorId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      authorId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Person',
  null, {})
};
