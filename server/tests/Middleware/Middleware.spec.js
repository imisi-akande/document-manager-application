/* eslint-disable no-unused-expressions */
import 'babel-polyfill';
import httpMocks from 'node-mocks-http';
import chai from 'chai';
import sinon from 'sinon';
import events from 'events';
import supertest from 'supertest';
import app from '../../../server/config/app';
import helper from '.././Helpers/documentHelper';
import testHelper from '../Helpers/test.helper';
import userHelper from '../Helpers/userHelper';
import authentication from '../../middleware/Authenticate';
import db from '../../models';

const expect = chai.expect;
const superRequest = supertest(app);
// const request = supertest(app);
const userParams = helper.documentOwner;
const adminRole = helper.documentAdmin;
const createResponse = () => httpMocks
  .createResponse({ eventEmitter: events.EventEmitter });
let token, adminToken, publicDocument, privateDocument;
let request;

describe('Middleware Test', () => {
  before((done) => {
    db.Roles.create(adminRole)
      .then((newRole) => {
        userParams.roleId = newRole.id;
        db.Roles.create({ title: 'regular' });
        db.Users.create(userParams)
          .then(() => {
            superRequest.post('/api/users/login')
              .send(userParams)
              .end((err, response) => {
                if (err) return err;
                token = response.body.token;
                done();
              });
          });
      });
  });

  after(() => db.sequelize.sync({ force: true }));

  describe('verifyToken', () => {

    it('returns an error if a wrong token is passed', (done) => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users',
        headers: { 'x-access-token': 'thiscanneverbeavalidbase-64code' }
      });
      authentication.verifyToken(req, res);
      res.on('end', () => {
        expect(res._getData().message).to.equal('Invalid token, Authentication required');
        done();
      });
    });

    it('calls the next function if the token is valid', (done) => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/documents',
        headers: { Authorization: token }
      });
      const middlewareStub = {
        callback: () => {}
      };

      sinon.spy(middlewareStub, 'callback');
      authentication.verifyToken(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });

    it('should not call next function if the token is not passed', (
      done) => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/api/users/login',
      });
      const middlewareStub = {
        callback: () => {}
      };

      sinon.spy(middlewareStub, 'callback');
      authentication.verifyToken(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).not.to.have.been.called;
      done();
    });
  });

  describe('validateAdmin', () => {

    it('calls the next function if the user is an admin', (done) => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users',
        headers: { Authorization: token },
        decoded: {
          roleId: 1
        }
      });
      const middlewareStub = {
        callback: () => {}
      };

      sinon.spy(middlewareStub, 'callback');
      authentication.validateAdmin(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });

    it('should not call next function if the user is not an admin', (
      done) => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users',
        decoded: {
          roleId: 2
        }
      });
      const middlewareStub = {
        callback: () => {}
      };

      sinon.spy(middlewareStub, 'callback');
      authentication.validateAdmin(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).not.to.have.been.called;
      done();
    });
  });
  describe('validateUserInput', () => {
    it('should not continue when email is null', () => {
      const response = createResponse();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/users',
        body: {
          firstname: 'kakashi',
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData().message).to.equal('Enter a valid email');
      });
      authentication.validateUserInput(request, response, middlewareStub.callback);
    });
    it('should continue when all the fields are complete', (done) => {
      const response = createResponse();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/users',
        body: {
          username: 'kakashi',
          firstname: 'kakashi',
          lastname: 'kakashi',
          email: 'kakashi@gmail.com',
          password: 'password'
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      authentication.validateUserInput(request, response, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });
  });
  describe('validateLoginInput', () => {
    it('should continue when email and password is provided', (done) => {
      const response = createResponse();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/users/login',
        body: {
          email: userHelper.adminUser.email,
          password: userHelper.adminUser.password
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      authentication.validateLoginInput(request, response, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });
    it('should not continue when password is null', () => {
      const response = createResponse();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/users/login',
        body: {
          email: 'pfunky@yahoo.com',
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData().message).to
          .equal('Please provide your email and password to login');
      });
      authentication.validateLoginInput(request, response, middlewareStub.callback);
    });
  });
  describe('validateUserUpdate', () => {
    it('should not continue when user want to modify admin profile', () => {
      const response = createResponse();
      request = httpMocks.createRequest({
        method: 'PUT',
        url: '/api/users/1',
        params: {
          id: '1'
        },
        decoded: {
          roleId: 1
        },
        body: {
          email: 'bosun@yahoo.com',
        },
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData().message).to
           .equal('This user does not exist');
      });
      authentication.validateUserUpdate(request, response, middlewareStub.callback);
    });
    it('should continue when user is the owner', (done) => {
      const response = createResponse();
      request = httpMocks.createRequest({
        method: 'PUT',
        url: '/api/users/2',
        headers: { 'x-access-token': token },
        body: {
          firstname: 'kkmailcom',
        },
        params: {
          id: 2
        },
        decoded: { roleId: 2 }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      authentication.validateUserUpdate(request, response, middlewareStub.callback);
      expect(middlewareStub.callback).not.to.have.been.called;
      done();
    });
  });
  describe('getUser', () => {
    it('should not continue when user does not exist', () => {
      const response = createResponse();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users/1',
        params: {
          id: 66
        },
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData()).to.equal('This user does not exist');
      });
      authentication.getUser(request, response, middlewareStub.callback);
    });
    it('should continue when user exist', (done) => {
      const response = createResponse();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users/2',
        params: {
          id: 2
        },
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      authentication.getUser(request, response, middlewareStub.callback);
      expect(middlewareStub.callback).not.to.have.been.called;
      done();
    });
  });
  describe('validateSearch', () => {
    it('should not continue when limit is negative', () => {
      const response = createResponse();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users/search',
        query: {
          limit: -2,
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData()
          .message).to.equal('Only positive number is allowed for limit value');
      });
      authentication.validateSearch(request, response, middlewareStub.callback);
    });
  });
  it('should not continue when offset is negative', () => {
    const response = createResponse();
    request = httpMocks.createRequest({
      method: 'GET',
      url: '/api/users/search',
      query: {
        offset: -2,
      }
    });
    const middlewareStub = {
      callback: () => { }
    };
    sinon.spy(middlewareStub, 'callback');
    response.on('end', () => {
      expect(response._getData().message).to
          .equal('Only positive number is allowed for offset value');
    });
    authentication.validateSearch(request, response, middlewareStub.callback);
  });
});
describe('validateDocumentsInput', () => {
  it('should not continue when title field is missing', () => {
    const response = createResponse();
    request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/documents',
      body: {
        content: 'Andela is the name'
      },
      decoded: { userId: 2, roleId: 2 }
    });
    const middlewareStub = {
      callback: () => { }
    };
    sinon.spy(middlewareStub, 'callback');
    response.on('end', () => {
      expect(response._getData().message).to.equal('Title field is required');
    });
    authentication.validateDocumentsInput(request, response, middlewareStub.callback);
  });
  it('should not continue when access level is kakashi', () => {
    const response = createResponse();
    request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/documents',
      body: {
        title: 'team bond',
        content: 'kakashi, aragon, mighty guy',
        access: 'kakashi'
      },
      decoded: { userId: 2, roleId: 2 }
    });
    const middlewareStub = {
      callback: () => { }
    };
    sinon.spy(middlewareStub, 'callback');
    response.on('end', () => {
      expect(response._getData().message).to
          .equal('Access type can only be public, private or role');
    });
    authentication.validateDocumentsInput(request, response, middlewareStub.callback);
  });
});
describe('getSingleDocument', () => {
  before((done) => {
    superRequest.post('/api/documents')
        .send(testHelper.publicDocument)
        .end((err, res) => {
          adminToken = res.body.token;
          publicDocument = res.body.document;
          // superRequest.post('/api/documents')
          //   .send(testHelper.privateDocument)
          //   .end((error, response) => {
          //     privateDocument = response.body.document;
          //     done();
            });
        });
  });
  it('should not continue when document does not exist', () => {
    const response = createResponse();
    request = httpMocks.createRequest({
      method: 'GET',
      url: '/api/documents/7',
      params: { id: 7 },
      decoded: { userId: 2, roleId: 2 }
    });
    const middlewareStub = {
      callback: () => { }
    };
    sinon.spy(middlewareStub, 'callback');
    response.on('end', () => {
      expect(response._getData().message).to
          .equal('This document cannot be found');
    });
    authentication.getSingleDocument(request, response, middlewareStub.callback);
  });
  it('should not continue when document is private', () => {
    const response = createResponse();
    request = httpMocks.createRequest({
      method: 'GET',
      url: '/api/documents/2',
      params: { id: 5 },
      decoded: { userId: 2, roleId: 2 }
    });
    const middlewareStub = {
      callback: () => { }
    };
    sinon.spy(middlewareStub, 'callback');
    response.on('end', () => {
      expect(response._getData().message).to
          .equal('You are not permitted to view this document');
    });
    authentication.getSingleDocument(request, response, middlewareStub.callback);
  });
  it('should continue when document is public', (done) => {
    const response = createResponse();
    request = httpMocks.createRequest({
      method: 'GET',
      url: '/api/documents/1',
      params: { id: 1 },
      decoded: { userId: 2, roleId: 2 }
    });
    const middlewareStub = {
      callback: () => { }
    };
    sinon.spy(middlewareStub, 'callback');
    authentication.getSingleDocument(request, response, middlewareStub.callback);
    expect(middlewareStub.callback).not.to.have.been.called;
    done();
  });

describe('hasDocumentPermission', () => {
  it('should not continue when user is not the owner of the document', () => {
    const response = createResponse();
    request = httpMocks.createRequest({
      method: 'PUT',
      url: '/api/documents/1',
      body: {
        content: 'Andela is the name'
      },
      params: {
        id: 1
      },
      decoded: { userId: 2, roleId: 2 }
    });
    const middlewareStub = {
      callback: () => { }
    };
    sinon.spy(middlewareStub, 'callback');
    response.on('end', () => {
      expect(response._getData().message).to
        .equal('This document does not exist');
    });
    authentication.hasDocumentPermission(request, response, middlewareStub);
  });
  it('should continue when user is the owner of the document', (done) => {
    const response = createResponse();
    request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/documents',
      body: {
        title: 'andela',
      },
      decoded: { userId: 1, roleId: 1 }
    });
    const middlewareStub = {
      callback: () => { }
    };
    sinon.spy(middlewareStub, 'callback');
    authentication.hasDocumentPermission(request, response, middlewareStub.callback);
    expect(middlewareStub.callback).not.to.have.been.called;
    done();
  });
});
describe('modifyRolePermission', () => {
  it('should not continue when admin want to modify the default admin role',
    () => {
      const response = createResponse();
      request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/api/roles/1',
        params: {
          id: 1
        },
        decoded: { userId: 1, roleId: 1 }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData().message).to
          .equal('This role does not exist');
      });
      authentication.modifyRolePermission(request, response, middlewareStub.callback);
    });
  it('should not continue when admin want to delete the default regular role',
    (done) => {
      const response = createResponse();
      request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/api/roles',
        params: {
          id: 2
        },
        decoded: { userId: 1, roleId: 1 }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData().message).to
          .equal('This role does not exist');
      });
      authentication.modifyRolePermission(request, response, middlewareStub.callback);
      done();
    });
});
