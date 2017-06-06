import request from 'supertest';
import chai from 'chai';
import app from '../../config/app';
import db from '../../models';
import helper from '../Helpers/test.helper';
import helpers from '../Helpers/userHelper';

const superRequest = request.agent(app);
const expect = chai.expect;

let newAdminUser;
let adminToken;
let regularToken;
let regularUser;
const emptyValue = ['username', 'lastname', 'firstname', 'password', 'email'];
const uniqueField = ['userName', 'email'];

describe('User API', () => {
  before((done) => {
    db.Roles.bulkCreate([{ title: 'admin', roleId: 1, id: 1 }, { title: 'regular', roleId: 2, id: 2 }])
    .then((role) => {
      db.Users.create(helper.adminUser1)
        .then((admin) => {
          newAdminUser = admin.dataValues;
          done();
        });
    });
  });
  after(() => {
    db.Roles.destroy({ where: {} });
  });

  describe('New Users', () => {
    describe('Create User', () => {
      it('should create a user', (done) => {
        superRequest.post('/api/users/')
          .send(helpers.regularUser)
          .end((error, response) => {
            regularUser = response.body.user;
            expect(response.status).to.equal(201);
            expect(response.body.user.userName)
              .to.equal(helpers.regularUser.userName);
            expect(response.body.user.firstName)
              .to.equal(helpers.regularUser.firstName);
            expect(response.body.user.lastName)
              .to.equal(helpers.regularUser.lastName);
            expect(response.body.user.roleId).to.equal(2);
            done();
          });
      });
      uniqueField.forEach((field) => {
        const uniqueUser = Object.assign({}, helper.firstUser);
        uniqueUser[field] = helper.regularUser1[field];
        it(`should fail when already existing ${field} is supplied`, (done) => {
          superRequest.post('/api/users')
            .send(helper.regularUser1)
            .end((err, res) => {
              superRequest.post('/api/users')
                .send(uniqueUser)
                .end((err, res) => {
                  expect(res.body.message).to
                    .equal(`${field} already exists`);
                  expect(res.status).to.equal(409);
                  done();
                });
            });
        });
        it('should fail if password is less than 6', (done) => {
        superRequest.post('/api/users')
          .send(helper.invalidPasswordUser)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message)
              .to.equal('Minimum of 6 characters is allowed for password');
            done();
          });
        });
      });
      it('should not allow admin user to sign up', (done) => {
        helper.firstUser.roleId = 1;
        superRequest.post('/api/users')
          .send(helper.firstUser)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.message).to
              .equal('Permission denied, You cannot sign up as an admin user');
            done();
          });
      });
    });
  });
  describe('Existing users', () => {
    describe('Login /users/login', () => {
      it('should allow admin user to login', (done) => {
        superRequest.post('/api/users/login')
          .send(helper.adminUser1)
          .end((err, res) => {
            adminToken = res.body.token;
            expect(res.status).to.equal(200);
            expect(res.body.token).to.not.equal(null);
            expect(res.body.message).to
              .equal('Login succesful');
            done();
          });
      });
      it('should allow other users to login', (done) => {
        superRequest.post('/api/users/login')
          .send(helper.regularUser1)
          .end((err, res) => {
            regularToken = res.body.token;
            expect(res.status).to.equal(200);
            expect(res.body.token).to.not.equal(null);
            expect(res.body.message).to
              .equal('Login succesful');
            done();
          });
      });
      it('should not allow unregistered users to login', (done) => {
        superRequest.post('/api/users/login')
          .send(helper.firstUser)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to
              .equal('Please enter a valid email and password to login!');
            done();
          });
      });
      it('should not allow login with invalid password', (done) => {
        superRequest.post('/api/users/login')
          .send({ email: newAdminUser.email, password: 'invalid' })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to
              .equal('Please enter a valid email and password to login!');
            done();
          });
      });
    });
    describe('Get all users, GET /users ', () => {
      it('should return invalid token if token is invalid', (done) => {
        superRequest.get('/api/users')
          .set({ 'x-access-token': 'document-management' })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to
              .equal('Invalid token, Authentication required');
            done();
          });
      });
      it(`should return users own profile, 
      when the request is from a regular user`, (done) => {
        superRequest.get('/api/users')
          .set({ 'x-access-token': regularToken })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to
              .equal('You have successfully retrived all users');
            expect(res.body.users.rows[0].userName).to
              .equal(helper.regularUser1.userName);
            done();
          });
      });
      it(`should return all users profile, 
      when the request is from an admin user`, (done) => {
        superRequest.get('/api/users')
          .set({ 'x-access-token': adminToken })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to
              .equal('You have successfully retrived all users');
            done();
          });
      });
      describe('Get user by Id GET /users/:id', () => {
        it('should return user\'s profile when valid user\'s id is supplied',
          (done) => {
            superRequest.get(`/api/users/${newAdminUser.id}`)
              .set({ 'x-access-token': regularToken })
              .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.user).to.not.equal(null);
                expect(res.body.user.id).to.equal(newAdminUser.id);
                expect(res.body.user.email).to.equal(newAdminUser.email);
                done();
              });
          });
        it('should return not found for invalid user id', (done) => {
          superRequest.get('/api/users/9999')
              .set({ 'x-access-token': adminToken })
              .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.message).to.equal('This user does not exist');
                done();
              });
        });
      });
      describe('Update user attributes PUT /users/:id', () => {
        it('should update user(s) profile when valid user token is supplied',
          (done) => {
            const updateData = {
              userName: 'imizy',
              lastName: 'Akande',
              password: 'newpassword'
            };
            superRequest.put(`/api/users/${regularUser.id}`)
              .send(updateData)
              .set({ 'x-access-token': adminToken })
              .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.equal('Your profile has been updated');
                expect(res.body.updatedUser.userName).to.equal('imizy');
                expect(res.body.updatedUser.lastName).to.equal('Akande');
                done();
              });
          });
        it('should return error when a user want to update id',
          (done) => {
            superRequest.put(`/api/users/${regularUser.id}`)
              .send({ id: 10 })
              .set({ 'x-access-token': regularToken })
              .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(res.body.message)
                  .to.equal('You are not permitted to update this profile');
                done();
              });
          });
        it('should return not found for invalid user id', (done) => {
          const data = { userName: 'Kingsley', lastname: 'Solomon' };
          superRequest.put('/api/users/4562')
            .send(data)
            .set({ 'x-access-token': adminToken })
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body.message).to.equal('This user does not exist');
              done();
            });
        });
        it(`should return permission denied when regular user want to
          update another user's profile`, (done) => {
          const data = { username: 'Kingsley', lastname: 'Solomon' };
          superRequest.put(`/api/users/${newAdminUser.id}`)
            .send(data)
            .set({ 'x-access-token': regularToken })
            .end((err, res) => {
              expect(res.status).to.equal(401);
              expect(res.body.message).to
                .equal('You are not permitted to update this profile');
              done();
            });
        });
        it('should give admin permission to update any user(s) profile',
          (done) => {
            const data = { username: 'Kingsley', lastname: 'Solomon' };
            superRequest.put(`/api/users/${regularUser.id}`)
              .send(data)
              .set({ 'x-access-token': adminToken })
              .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to
                  .equal('Your profile has been updated');
                expect(res.body.updatedUser.userName).to.equal('imizy');
                expect(res.body.updatedUser.lastName).to.equal('Akande');
                done();
              });
          });
      });
      describe('Delete user DELETE /users/:id', () => {
        let newUser, newUsersToken;
        before((done) => {
          superRequest.post('/api/users')
          .send(helper.thirdUser)
          .end((err, res) => {
            newUser = res.body.user;
            newUsersToken = res.body.token;
            done();
          });
        });
        it('should return not found for invalid user id', (done) => {
          superRequest.delete('/api/users/678')
          .set({ 'x-access-token': adminToken })
          .end((err, res) => {
            expect(res.body.message).to.equal('This user does not exist');
            expect(res.status).to.equal(404);
            done();
          });
        });
        it('should fail when request is from a regular user', (done) => {
          superRequest.delete(`/api/users/${regularUser.id}`)
          .set({ 'x-access-token': regularToken })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to
              .equal('You are not permitted to perform this action');
            done();
          });
        });
        it('allow admin to delete a user', (done) => {
          superRequest.delete(`/api/users/${newUser.id}`)
          .set({ 'x-access-token': adminToken })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to
              .equal('This account has been successfully deleted');
            done();
          });
        });
        describe('SEARCH USERS PAGINATION', () => {
          const arrayUsers = helper.usersArray();
          before((done) => {
            db.Users.bulkCreate(arrayUsers);
            done();
          });
        });
      });
    });
  });
});
