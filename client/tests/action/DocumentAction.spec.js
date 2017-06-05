import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import * as documentActions from '../../actions/DocumentActions';
import * as types from '../../actions/ActionTypes';


describe('DOCUMENT ACTION', () => {
  describe('createUser', () => {
    it('should create a CREATE_DOCUMENT action', () => {
      const document = { title: 'Imisioluwa',
        content: 'Andela Talent accelerator',
        access: 'public',
        userId: 2 };
      const expectedAction = {
        type: types.CREATE_DOCUMENT,
        document
      };
      const action = documentActions.createDocument(document);
      expect(action).toEqual(expectedAction);
    });
  });
});
