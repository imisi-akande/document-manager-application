import * as types from '../actions/ActionTypes';
import initialState from './InitialState';

const documentsReducer = (state = initialState.documents, action) => {
  switch (action.type) {
    case types.CREATE_DOCUMENT:
      return [...state, ...action.documents];
    case types.LOAD_DOCUMENT_SUCCESS:
      return action.documents;
    case types.LOAD_OWN_DOCUMENT_SUCCESS:
      return action.documents;
    case types.CREATE_DOCUMENT_SUCCESS:
      return [...state, action.document];
    case types.UPDATE_OWN_DOCUMENT_SUCCESS:
      return {
        documents: {
          rows: [...state.filter(document =>
          document.id !== action.document.id),
            ...action.document
          ]
        }
      };
    case types.DELETE_DOCUMENT_SUCCESS:
      {
        return {
          ...state,
          documents: {
            rows:
              state.documents.rows.filter(document =>
                document.id !== action.id
              )
          },
          pagination: state.pagination
        };
      }
    case types.UPDATE_DOCUMENT_SUCCESS:
      return [...state.filter(document => document.id !== action.document.id),
        ...action.document
      ];
    default:
      return state;
  }
};

export default documentsReducer;
