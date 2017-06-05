import * as types from '../actions/ActionTypes';
import initialState from './InitialState';

const documentsReducer = (state = initialState.documents, action) => {
  switch (action.type) {
    case types.CREATE_DOCUMENT:
      return [...state, Object.assign({}, action.documents)];
    case types.LOAD_DOCUMENT_SUCCESS:
      return action.documents;
    case types.LOAD_OWN_DOCUMENT_SUCCESS:
      return {
        documents: {
          rows: action.documents.documents.rows
        }
      };
    case types.UPDATE_OWN_DOCUMENT_SUCCESS:
      return {
        documents: {
          rows: [...state.filter(document => document.id !== action.document.id),
            Object.assign({}, action.document)
          ]
        }
      };

      // return state;

    case types.CREATE_DOCUMENT_SUCCESS:
      return [...state, Object.assign({}, action.document)];
    case types.DELETE_DOCUMENT_SUCCESS:
      {
        return Object.assign({}, state, {
          documents: {
            rows: [
              ...state.documents.rows.filter(document =>
                document.id !== action.id
              )
            ]
          }
        });
      }
    case types.UPDATE_DOCUMENT_SUCCESS:
      return [...state.filter(document => document.id !== action.document.id),
        Object.assign({}, action.document)
      ];
    default:
      return state;
  }
};

export default documentsReducer;
