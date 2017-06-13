import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fixtures from './fixtures.json';

import mockRequestFactory from './requestFactory';

import {
  createUserSuccess,
  deleteUserSuccess,
  getUserSuccess,
  fetchProfile,
  updateUserSuccess,
} from '../../../actions/UserAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


jest.mock('superagent', () => mockRequestFactory);
jest.mock('react-router', () => ({
  browserHistory: {
    push: () => null,
  },
}));
describe('async actions', () => {
  it('creates CREATE_USER_SUCCESS on creating user',
  () => {
    const expectedActions = [{
      type: 'CREATE_USER_SUCCESS',
    }];


    const store = mockStore({ user: {} });

    store.dispatch(createUserSuccess());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates DELETE_USER_SUCCESS initial state', () => {
    const expectedActions = [];

    const store = mockStore({ document: {} });

    store.dispatch((deleteUserSuccess));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates DELETE_USER_SUCCESS on deleting user', () => {
    const expectedActions = [{
      type: 'DELETE_USER_SUCCESS',
      user: fixtures.users.rows[0],
    }];

    const store = mockStore({ users: {} });

    store.dispatch((deleteUserSuccess(fixtures.users.rows[0])));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates  get USER_SUCCESS on fetching users', () => {
    const expectedActions = [{
      type: 'USER_SUCCESS',
      user: fixtures.users.rows[1],
    }];

    const store = mockStore({ users: {} });

    store.dispatch((getUserSuccess(fixtures.users.rows[1])));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('SET_CURRENT_USER, on fetch profile', () => {
    const expectedActions = [{
      type: 'SET_CURRENT_USER',
    }];

    const store = mockStore();

    return store.dispatch(fetchProfile(51))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates UPDATE_USER_SUCCESS on updating users', () => {
    const expectedActions = [{
      type: 'UPDATE_USER_SUCCESS',
      user: fixtures.users.rows[1],
    }];

    const store = mockStore({ users: {} });

    store.dispatch((updateUserSuccess(fixtures.users.rows[1])));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('returns SEARCH_RESULTS on searching for users', () => {
    const expectedActions = [{
      type: 'USER_SUCCESS',
      user: fixtures.users.rows[0],
    }];

    const store = mockStore({ users: {} });

    store.dispatch((getUserSuccess(fixtures.users.rows[0])));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
