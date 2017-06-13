 import chai from 'chai';
import db from '../../models';
import helper from '../Helpers/userHelper';

const expect = chai.expect;
const userParams = helper.regularUser;
const roleParams = helper.regularRole;

const notNullAttrs = [
  'firstName',
  'lastName',
  'userName',
  'email',
  'password',
  'roleId'
];

let user;

describe('User Model', () => {
  before((done) => {
    db.Roles.create(roleParams)
      .then((newRole) => {
        userParams.roleId = newRole.id;
        db.Users.create(userParams)
          .then((newUser) => {
            user = newUser;
            done();
          });
      });
  });

  after(() => db.sequelize.sync({ force: true }));

  describe('Create User', () => {
    it('has valid properties', () => {
      expect(user.firstName).to.equal(userParams.firstName);
      expect(user.lastName).to.equal(userParams.lastName);
      expect(user.userName).to.equal(userParams.userName);
      expect(user.email).to.equal(userParams.email);
    });

    it('saves user with valid attributes', () => {
      user.save().then((savedUser) => {
        expect(savedUser.firstName).to.equal(user.firstName);
        expect(savedUser.lastName).to.equal(user.lastName);
        expect(savedUser.userName).to.equal(user.userName);
      });
    });

    it('creates password and encrypts it', () => {
      user.save().then((savedUser) => {
        expect(savedUser.password).to.not.equal(userParams.password);
      });
    });
  });

  describe('Update User', () => {
    it('hashes updated passwords', () => {
      user.save()
        .then(newUser => newUser.update({ password: 'validpassword' }))
        .then((updatedUser) => {
          expect(updatedUser.password).to.not.equal(
            'valid-password');
        });
    });
  });

  describe('Validations', () => {
    describe('NOT NULL attributes', () => {
      notNullAttrs.forEach((attr) => {
        it(`fails without ${attr}`, () => {
          user[attr] = null;
          return user.save()
            .then(newUser => expect(newUser).to.not.exist)
            .catch(err =>
              expect(/notNull/.test(err.message)).to.be.true
            );
        });
      });
    });
  });
});
