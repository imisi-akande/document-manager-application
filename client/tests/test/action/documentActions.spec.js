import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fixtures from './fixtures.json';

import mockRequestFactory from './requestFactory';
import {
  deleteDocumentSuccess,
  documentSaver,
  getDocumentSuccess,
  fetchOwnDocuments,
  updateDocument,
} from '../../../actions/DocumentActions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('superagent', () => mockRequestFactory);
jest.mock('react-router', () => ({
  browserHistory: {
    push: () => null,
  },
}));

describe('async actions', () => {
  it('creates LOAD_OWN_DOCUMENT_SUCCESS on fetching own documents',
  () => {
    const expectedActions = 'LOAD_OWN_DOCUMENT_SUCCESS';


    const store = mockStore({ document: {} });

    store.dispatch(fetchOwnDocuments());
    expect(store.getActions()[0].type).toEqual(expectedActions);
  });

  it('creates LOAD_DOCUMENT_SUCCESS on fetching all documents', () => {
    const expectedActions = [{
      type: 'LOAD_DOCUMENT_SUCCESS',
    }];

    const store = mockStore({ document: {} });

    store.dispatch(getDocumentSuccess());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates DELETE_DOCUMENT_SUCCESS on successful delete', () => {
    const expectedActions = [{
      type: 'DELETE_DOCUMENT_SUCCESS',
      id: 1,
    }];

    const store = mockStore({ document: {} });

    store.dispatch(deleteDocumentSuccess(1));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
