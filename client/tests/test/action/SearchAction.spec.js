import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fixtures from './fixtures.json';

import mockRequestFactory from './requestFactory';
import { getDocumentSuccess, getOwnDocumentSuccess } from
'../../../actions/SearchDocumentActions';

import { getUserSuccess } from '../../../actions/SearchUserAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('superagent', () => mockRequestFactory);
jest.mock('react-router', () => ({
  browserHistory: {
    push: () => null,
  },
}));

describe('async actions', () => {
  it('creates LOAD_DOCUMENT_SUCCESS on searching documents',
  () => {
    const expectedActions = [{
      type: 'LOAD_DOCUMENT_SUCCESS',
    }];


    const store = mockStore({ document: {} });

    store.dispatch(getDocumentSuccess());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates LOAD_OWN_DOCUMENT_SUCCESS on fetching own documents', () => {
    const expectedActions = [{
      type: 'LOAD_OWN_DOCUMENT_SUCCESS',
    }];

    const store = mockStore({ document: {} });

    store.dispatch(getOwnDocumentSuccess());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates USER_SUCCESS on searching for user', () => {
    const expectedActions = [{
      type: 'USER_SUCCESS',
    }];

    const store = mockStore({ document: {} });

    store.dispatch(getUserSuccess());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
