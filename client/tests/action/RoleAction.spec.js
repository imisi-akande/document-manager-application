import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import mockRequestFactory from './requestFactory';
import {
  createRole,
  getRoleSuccess,
  deleteRoleSuccess,

} from '../../actions/RoleAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('superagent', () => mockRequestFactory);
jest.mock('react-router', () => ({
  browserHistory: {
    push: () => null,
  },
}));

describe('async actions', () => {
  test('CREATE_ROLE on creating role',
  () => {
    const expectedActions = [{
      type: 'CREATE_ROLE',
    }];

    const store = mockStore({ role: {} });

    store.dispatch(createRole());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('create LOAD_ROLE_SUCCESS on fetching all roles', () => {
    const expectedActions = [{
      type: 'LOAD_ROLE_SUCCESS',
    }];

    const store = mockStore({ role: {} });

    store.dispatch(getRoleSuccess());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('create DELETE_ROLE_SUCCESS on delete roles', () => {
    const expectedActions = [{
      type: 'DELETE_ROLE_SUCCESS',
    }];

    const store = mockStore(
      {
        role: {}
      });

    store.dispatch(deleteRoleSuccess());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
