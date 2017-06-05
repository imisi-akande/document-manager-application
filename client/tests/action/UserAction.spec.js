import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import * as userActions from '../../actions/UserAction';
import * as types from '../../actions/ActionTypes';




describe('USER ACTION', () => {
  describe('createUser', () => {
    it('should create a CREATE_USER action', () => {
      const user = { firstname: 'Imisioluwa',
        lastname: 'Akande',
        username: 'imizy',
        email: 'imiz@yahoo.com',
        password: '123456',
        roleId: 1 };
      const expectedAction = {
        type: types.CREATE_USER,
        user
      };
      const action = userActions.createUser(user);
      expect(action).toEqual(expectedAction);
    });
  });
});
