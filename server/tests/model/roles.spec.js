import chai from 'chai';
import db from '../../models';
import helper from '../Helpers/test.helper';
import roleHelper from '../Helpers/rolesHelper';

const expect = chai.expect;

describe('ROLE', () => {
  let guestRole;
  after((done) => {
    db.Roles.destroy({ where: {} });
    done();
  });

  describe('Create Role', () => {
    it('should create a role', (done) => {
      db.Roles.create(helper.guestRole1)
        .then((role) => {
          guestRole = role.dataValues;
          expect(role.dataValues.title).to.equal(helper.guestRole1.title);
          expect(role.dataValues.id).to.equal(helper.guestRole1.id);
          done();
        });
    });

    describe('NOT NULL violation', () => {
      it('should fail when title of a role is null', (done) => {
        const nullTitle = { title: null };
        db.Roles.create(nullTitle)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('title cannot be null');
          expect(error.errors[0].type).to.equal('notNull Violation');
          expect(error.errors[0].value).to.equal(null);
          done();
        });
      });
    });
    describe('EMPTY String violation', () => {
      it('should fail for empty string title', (done) => {
        const emptyTitle = { title: ' ' };
        db.Roles.create(emptyTitle)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Input a valid title');
          expect(error.errors[0].type).to.equal('Validation error');
          expect(error.errors[1].message)
            .to.equal('This field must not be empty');
          done();
        });
      });
    });

    describe('Update Role', () => {
      let newRole;
      before((done) => {
        db.Roles.findById(guestRole.id)
        .then((role) => {
          role.update({ title: 'fellow' })
            .then((updatedRole) => {
              newRole = updatedRole;
              done();
            });
        });
      });

      it('should update a role', (done) => {
        db.Roles.findById(newRole.id)
        .then((role) => {
          expect(role.dataValues.id).to.equal(guestRole.id);
          expect(role.dataValues.title).to.not.equal(guestRole.title);
          expect(role.dataValues.title).to.equal('fellow');
          done();
        });
      });
    });

    describe('DELETE role', () => {
      it('should delete a role', (done) => {
        db.Roles.destroy({ where: { id: guestRole.id } })
        .then(() => {
          db.Roles.findById(guestRole.id)
            .then((res) => {
              expect(res).to.equal(null);
              done();
            });
        });
      });
    });
  });
});
