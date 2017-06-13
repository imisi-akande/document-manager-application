import expect from 'expect';
import {
  CREATE_DOCUMENT_SUCCESS,
  LOAD_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_SUCCESS,
  LOAD_OWN_DOCUMENT_SUCCESS,

} from '../../../actions/ActionTypes';


import reducer from '../../../reducers/DocumentReducer';

describe('documents reducer', () => {
  const testDocuments = {
    documents: {
      rows: [
        {
          title: 'title one',
          access: 'public',
          id: 1
        },
        {
          title: 'title two',
          access: 'private',
          id: 2
        }
      ],
    },
    count: 2,
    metaData: {
      currentPage: 1,
      pageSize: 1,
      pages: 1,
      totalCount: 2
    },
  };
  it('should return the initial state', () => {
    expect(reducer({ documents: { rows: [] }, message: '', pagination: {} }, {}))
    .toEqual({ documents: { rows: [] }, message: '', pagination: {} });
  });
  it('should handle GET_DOCUMENTS_SUCCESS', () => {
    expect(reducer([], {
      type: LOAD_DOCUMENT_SUCCESS,
      documents: {
        rows: [],
        count: 0
      },
    }))
    .toEqual({ count: 0, rows: [] });
  });

  it('should handle CREATE_DOCUMENT', () => {
    expect(reducer([], {
      type: CREATE_DOCUMENT_SUCCESS,
      document: {
        rows: [],
        count: 0
      },
    }))
    .toEqual([{ count: 0, rows: [] }]);
  });

  it('should handle DELETE_DOCUMENT_SUCCESS', () => {
    const state = testDocuments;
    expect(reducer(state, {
      type: DELETE_DOCUMENT_SUCCESS,
      document: { documentId: 5, status: 'deleted' }
    }).count)
    .toEqual(2);

    expect(reducer(state, {
      type: DELETE_DOCUMENT_SUCCESS,
      document: { documentId: 1, status: 'deleted' }
    }).documents.rows[1].title)
    .toEqual('title two');
  });

  it('should handle LOAD_OWN_DOCUMENT_SUCCESS', () => {
    const expectedState = {
      documents: {
        rows: [{ access: 'public',
          id: 1,
          title: 'title one' },
        { access: 'private',
          id: 2,
          title: 'title two' }]
      }
    };

    expect(reducer({}, {
      type: LOAD_OWN_DOCUMENT_SUCCESS,
      documents: testDocuments.documents.rows
    }))
    .toEqual(expectedState);
  });

  it('should handle LOAD_DOCUMENT_SUCCESS', () => {
    const expectedState = { documents: { rows: [{ access: 'public',
      id: 1,
      title: 'title one' },
    { access: 'private',
      id: 2,
      title: 'title two' }] } };
    expect(reducer({}, {
      type: LOAD_DOCUMENT_SUCCESS,
      documents: {
        documents: testDocuments.documents
      }
    }))
    .toEqual(expectedState);
  });
})
;
