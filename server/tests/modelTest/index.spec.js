import chai from 'chai';
import model from '../../models';

const expect = chai.expect;
describe('Created MODELS:', () => {
  it('should have User Model Created', () => expect(model.Users).to.exist);
  it('should have Role Model Created', () => expect(model.Roles).to.exist);
  it('should have Document Model Created', () => expect(model.Documents)
  .to.exist);
});
