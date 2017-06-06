import request from 'supertest';
import chai from 'chai';
import app from '../../config/app';
import db from '../../models';
import helper from '../Helpers/test.helper';
import roleHelper from '../Helpers/rolesHelper';

const superRequest = request.agent(app);
const expect = chai.expect;

const adminParams = helper.firstUser;
const adminRoleParams = helper.adminRole;
const regularRoleParams = helper.regularRole;

let adminToken, regularToken;
let role;

describe('ROLE API', () => {
  before((done) => {
    db.Roles.create(adminRoleParams)
      .then((newRole) => {
        adminParams.roleId = newRole.id;
        db.Users.create(adminParams)
          .then(() => {
            superRequest.post('/api/users/login')
              .send(adminParams)
              .end((err, res) => {
                adminToken = res.body.token;
                done();
              });
          });
      });
  });
  after(() => db.Roles.destroy({ where: {} }));

  describe('ADMIN', () => {
    it('should allow admin to create a role', (done) => {
      superRequest.post('/api/roles')
        .send(regularRoleParams)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.role.title).to.equal(regularRoleParams.title);
          done();
        });
    });

    it('should return error for empty string title', (done) => {
      superRequest.post('/api/roles')
        .send({ title: '' })
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.errorArray[1].message).to
            .equal('This field must not be empty');
          done();
        });
    });
    describe('DELETE ROLE, DELETE /roles', () => {
      before((done) => {
        superRequest.post('/api/roles')
        .send(helper.guestRole1)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          role = res.body.role;
          done();
        });
      });
      it('should delete a role', (done) => {
        superRequest.delete(`/api/roles/${role.id}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('This role has been deleted');
          done();
        });
      });
      const roleArray = [1, 2];
      roleArray.forEach((roleId) => {
        it(`should not allow admin to delete role with id ${roleId}`, (done) => {
          superRequest.delete(`/api/roles/${roleId}`)
              .set({ 'x-access-token': adminToken })
              .end((er, re) => {
                expect(re.status).to.equal(403);
                expect(re.body.message).to
                  .equal('You are not permitted to modify this role');
                done();
              });
        });
        describe('GET BY ID', () => {
          before((done) => {
            superRequest.post('/api/roles')
            .send(helper.guestRole2)
            .set({ 'x-access-token': adminToken })
            .end((err, res) => {
              role = res.body.role;
              done();
            });
          });

          describe('UPDATE PUT /api/roles/:id', () => {
            let newRole;
            before((done) => {
              superRequest.post('/api/roles')
                .send(helper.guestRole3)
                .set({ 'x-access-token': adminToken })
                .end((err, res) => {
                  newRole = res.body.role;
                  done();
                });
            });
            it('should update a role when given a valid id', (done) => {
              superRequest.put(`/api/roles/${5}`)
                .send({ title: 'andela' })
                .set({ Authorization: adminToken })
                .end((er, re) => {
                  expect(re.status).to.equal(200);
                  expect(re.body.message).to.equal('This role has been updated');
                  expect(re.body.updatedRole.title).to.equal('andela');
                  done();
                });
            });
             it('should not update a role when given an empty title string', (done) => {
               superRequest.put(`/api/roles/${5}`)
                  .send({ title: '' })
                  .set({ 'x-access-token': adminToken })
                  .end((er, re) => {
                    expect(re.status).to.equal(400);
                    expect(re.body.errorArray[1].message).to
                      .equal('This field must not be empty');
                    done();
                  });
             });
            const roleArray = [1, 2];
            roleArray.forEach((roleId) => {
              it(`should not allow admin to update role with id ${roleId}`, (done) => {
                superRequest.put(`/api/roles/${roleId}`)
                  .send({ title: 'andela' })
                  .set({ 'x-access-token': adminToken })
                  .end((er, re) => {
                    expect(re.status).to.equal(403);
                    expect(re.body.message).to
                      .equal('You are not permitted to modify this role');
                    done();
                  });
              });
              it('should return not found for invalid id', (done) => {
                superRequest.put('/api/roles/999')
                  .send({ title: 'talent' })
                  .set({ 'x-access-token': adminToken })
                  .end((error, resp) => {
                    expect(resp.status).to.equal(404);
                    expect(resp.body.message).to.equal('This role does not exist');
                    done();
                  });
              });
            });
            describe('GET ALL ROLES GET /roles', () => {
              before((done) => {
                superRequest.post('/api/roles')
                  .send(helper.guestRole1)
                  .set({ 'x-access-token': adminToken });
                done();
              });
            });
            it('it should allow admin to view all roles', (done) => {
              superRequest.get('/api/roles')
                .set({ 'x-access-token': adminToken })
                .end((err, res) => {
                  expect(res.status).to.equal(200);
                  expect(res.body.message).to
                    .equal('You have successfully retrieved all roles');
                  expect(res.body.roles.length).to.be.greaterThan(0);
                  done();
                });
            });
          });
        });
      });
    });
  });
});
