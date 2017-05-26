import * as types from '../actions/ActionTypes';
import initialState from './initialState';

const documentsReducer = (state = initialState.documents, action) => {
  switch (action.type) {
    case types.CREATE_DOCUMENT:
      return [...state, Object.assign({}, action.documents)];
    case types.LOAD_DOCUMENT_SUCCESS:
      return action.documents;
    case types.CREATE_DOCUMENT_SUCCESS:
      return [...state, Object.assign({}, action.document)];
    case types.UPDATE_DOCUMENT_SUCCESS:
      return [...state.filter(document => document.id !== action.document.id),
        Object.assign({}, action.document)];
    default:
      return state;
  }
};

export default documentsReducer;
