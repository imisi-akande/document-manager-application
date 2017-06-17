import * as types from '../../../actions/ActionTypes';
import roleReducer from '../../../reducers/RoleReducer';


describe('roleReducer test', () => {
  let roles;

  beforeEach(() => {
    roles = [
      {
        id: 1,
        title: 'admin',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 2,
        title: 'regular',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 3,
        title: 'guest',
        createdAt: '',
        updatedAt: '',
      },
    ];
  });

  it('has the default initial state', () => {
    expect(roleReducer(undefined, {})).toEqual([]);
  });

  it('handles CREATE_ROLE action', () => {
    const action = {
      type: types.CREATE_ROLE,
      role: [
        {
          id: 4,
          title: 'new role',
          createdAt: '',
          updatedAt: '',
        },
      ]
    };
    expect(roleReducer(roles, action)).toEqual([...roles, ...action.role]);
  });

  it('handles LOAD_ROLE_SUCCESS action', () => {
    const action = {
      type: types.LOAD_ROLE_SUCCESS,
      role: roles
    };
    expect(roleReducer([], action)).toEqual(action.roles);
  });

  it('handles DELETE_ROLE_SUCCESS action', () => {
    const action = {
      type: types.DELETE_ROLE_SUCCESS,
      id: 2,
    };
    expect(roleReducer(roles, action)).toEqual([roles[0], roles[2]]);
  });
});
