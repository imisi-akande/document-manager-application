import * as types from '../actions/ActionTypes';
import initialState from './initialState';

const documentsReducer = (state = initialState.documents, action) => {
  switch (action.type) {
    case types.CREATE_DOCUMENT:
      return [...state, Object.assign({}, action.documents)];
    case types.LOAD_DOCUMENT_SUCCESS:
      return Object.assign({}, state, { documents: action.body.documents || action.body.userDocuments,
        pagination: action.body.pagination });
    case types.CREATE_DOCUMENT_SUCCESS:
      return [...state, Object.assign({}, action.document)];
    case types.UPDATE_DOCUMENT_SUCCESS:
      return [...state.filter(document => document.id !== action.document.id),
        Object.assign({}, action.document)];
    case types.DELETE_DOCUMENT_SUCCESS:
      console.log('state', state);
      const documents = {};
      const currentDocs = state.documents.rows;
      documents.rows = currentDocs.filter(document => document.id !== action.id);
      const newState = { documents };
      return Object.assign({}, ...state, newState);
    default:
      return state;
  }
};

export default documentsReducer;
