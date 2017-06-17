import {
} from '../../../actions/ActionTypes';

import authorization from '../../../reducers/AuthReducer';

it('should handle SET_CURRENT_USER', () => {
  const state = {};
  const user = {
    email: 'kola@yahoo.com',
    password: '123456'
  };

  const expectedState = [
    user
  ];

  const action = {
    type: 'SET_CURRENT_USER',
    user
  };

  const newState = authorization(state, action);
  expect(newState).toEqual(expectedState);
})
;

