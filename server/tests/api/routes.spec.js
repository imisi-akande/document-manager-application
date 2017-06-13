import chai from 'chai';
import supertest from 'supertest';
import app from '../../../server/config/app';

const request = supertest(app);
const expect = chai.expect;
describe('Index route', () => {
  it('loads successfully', (done) => {
    request.get('/').expect(200, done);
  });
});
describe('ROUTE GET /', () => {
  it('should return a welcome message', (done) => {
    request.get('/').end((err, res) => {
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('should return a message when accessing a wrong route', (done) => {
    request.get('/andela/nelsonabieno').end((err, res) => {
      expect(res.status).to.equal(200);
      done();
    });
  });
});
