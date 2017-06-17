import chai from 'chai';
import db from '../../models';
import helper from '../../tests/Helpers/test.helper';

const expect = chai.expect;

describe('Document Model', () => {
  let userDocument;
  let regularUser;
  const requiredFields = ['title', 'content'];

  before((done) => {
    db.Roles.create({ title: 'regular', id: 2 })
      .then(() => {
        db.Users.create(helper.regularUser1)
          .then((user) => {
            regularUser = user.dataValues;
            done();
          });
      });
  });

  after((done) => { db.Roles.destroy({ where: {} }); done(); });

  describe('CREATE Document', () => {
    it('should create a document', (done) => {
      helper.publicDocument.ownerRoleId = regularUser.roleId;
      helper.publicDocument.authorId = regularUser.id;
      db.Documents.create(helper.publicDocument)
        .then((doc) => {
          userDocument = doc;
          expect(doc.title).to.equal(helper.publicDocument.title);
          expect(doc.content)
            .to.equal(helper.publicDocument.content);
          expect(doc).to.have.property('createdAt');
          expect(doc.authorId).to.equal(regularUser.id);
          done();
        });
    });
  });

  describe('FIELD CANNOT BE EMPTY', () => {
    requiredFields.forEach((field) => {
      it('should return "not null Violation message"', (done) => {
        const notNull = Object.assign({}, helper.publicDocument);
        notNull[field] = null;
        db.Documents.create(notNull)
          .then()
          .catch((error) => {
            expect(error.errors[0].message).to.equal(`${field} cannot be null`);
            expect(error.errors[0].type).to.equal('notNull Violation');
            expect(error.errors[0].path).to.equal(field);
            expect(error.errors[0].value).to.equal(null);
            done();
          });
      });
    });
  });

  describe('EMPTY STRING', () => {
    it('should return error', (done) => {
      const emptyTitle = Object.assign({}, helper.publicDocument);
      emptyTitle.title = '';
      db.Documents.create(emptyTitle)
          .then(() => {
            done();
          })
          .catch((error) => {
            expect(error.errors[0].message)
              .to.equal('This field cannot be empty');
            expect(error.errors[0].type).to.equal('Validation error');
            done();
          });
    });
  });

  describe('ACCESS Violation', () => {
    it('should return error when access is not public, private or role',
    (done) => {
      const accessError = Object.assign({}, helper.publicDocument);
      accessError.title = 'anytitle';
      accessError.access = 'andela';
      db.Documents.create(accessError)
        .then(() => {
          done();
        })
        .catch((error) => {
          expect(error.errors[0].message)
            .to.equal('role can only be of public, private or your role');
          expect(error.errors[0].type).to.equal('Validation error');
          expect(error.errors[0].path).to.equal('access');
          done();
        });
    });
  });

  describe('UPDATE Document', () => {
    let newDocument;
    beforeEach((done) => {
      db.Documents.findById(userDocument.id)
        .then((doc) => {
          doc.update({ title: 'new andela book' })
            .then((updatedDocument) => {
              newDocument = updatedDocument;
              done();
            });
        });
    });

    it('should give the correct result', (done) => {
      db.Documents.findById(userDocument.id)
        .then((doc) => {
          expect(doc.dataValues.id).to.equal(newDocument.id);
          expect(doc.dataValues.title).to.equal('new andela book');
          expect(doc.dataValues.content).to.equal(userDocument.content);
          expect(doc.dataValues.access).to.equal(userDocument.access);
          expect(doc.dataValues.authorId).to.equal(userDocument.authorId);
          done();
        });
    });
  });
});
