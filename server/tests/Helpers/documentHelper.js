import faker from 'faker';

module.exports = {
  fullTimeDocument: {
    title: 'Anuhbhb',
    content: 'hello world',
    access: 'public',
    authorId: '4'
  },

  fullTimeDocument2: {
    title: 'Anthony',
    content: 'Andela Talent',
    access: 'public',
    authorId: 1
  },

  partTimeDocument: {
    content: 'Terms and Condition',
    access: 'public'
  },

  existingDocument: {
    title: 'Joshua',
    content: 'The existence of the silicon valley',
    access: 'private',
    authorId: 1
  },

  documentOwner: {
    firstName: 'Kingdom',
    lastName: 'Isaac',
    userName: 'kings',
    email: 'kingdomisaac@yahoo.com',
    password: '123456',
    roleId: 1
  },

  privateDocument: {
    title: 'Client Biodata analysis',
    content: 'Business agreement and stakeholder management',
    access: 'private',
  },

  documentAdmin: {
    title: 'admin'
  },

  documentRegular: {
    title: 'regular'
  },

  privateUser: {
    firstName: 'Tracy',
    lastName: 'ezebuike',
    userName: 'tracyb',
    password: 'password',
    email: 'tracyb@yahoo.com'
  },

  updateDocument: {
    title: 'update'
  },
  document1: {
    title: faker.name.jobTitle(),
    content: faker.name.jobTitle(),
    access: 'public',
    authorId: 1,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent()
  },
  document2: {
    title: faker.name.jobTitle(),
    content: faker.name.jobTitle(),
    authorId: 2,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent()
  },
  document3: {
    id: 38,
    title: 'History',
    content: 'The emergence of the worldwar II!!.',
    access: 'private',
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    authorId: 1
  },
  document4: {
    id: 40,
    title: faker.name.jobTitle(),
    content: faker.name.jobTitle(),
    access: 'public',
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    authorId: 2
  }
};
