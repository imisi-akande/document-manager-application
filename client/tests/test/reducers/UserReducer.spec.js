import * as types from '../../../actions/ActionTypes';
import userReducer from '../../../reducers/UserReducer';

describe('UserReducer', () => {
  const usersInDatabase = {
    paginationInfo: {
      page_count: 1,
      page: 1,
      page_size: 1,
      total_count: 2
    },
    users: {
      rows: [
        {
          id: 1,
          name: 'Akande Imisioluwa',
          email: 'imisioluwa.akande@andela.com',
          privacy: 'public',
          createdAt: '2017-05-20T14:01:51.891Z',
          updatedAt: '2017-06-03T11:48:54.226Z',
          roleId: 1
        },
        {
          id: 2,
          name: 'Ayoola Ajose',
          email: 'ayoola.ajose@andela.com',
          privacy: 'public',
          createdAt: '2017-05-20T14:01:51.891Z',
          updatedAt: '2017-06-03T11:48:54.226Z',
          roleId: 2
        }
      ],
    },
  };

  it('should put all users in the store if handled LOAD_USER_SUCCESS', () => {
    const state = {};
    const expectedState = {
      usersInDatabase
    };
    it('has the default initial state', () => {
      expect(userReducer(undefined, {})).toEqual([]);
    });

    it('handles CREATE_USER action', () => {
      const action = {
        type: types.CREATE_USER,
        user: [
          {
            id: 2,
            name: 'Ayoola Ajose',
            email: 'ayoola.ajose@andela.com',
            privacy: 'public',
            createdAt: '2017-05-20T14:01:51.891Z',
            updatedAt: '2017-06-03T11:48:54.226Z',
            roleId: 2,
          },
        ]
      };
      expect(userReducer(users, action)).toEqual([...users, ...action.users]);
    });
    it('handles LOAD_USER_SUCCESS action', () => {
      const action = {
        type: types.LOAD_ROLE_SUCCESS,
        user: users
      };
      expect(userReducer([], action)).toEqual(action.roles);
    });
    it('handles DELETE_ROLE_SUCCESS action', () => {
      const action = {
        type: types.DELETE_ROLE_SUCCESS,
        id: 2,
      };
      expect(userReducer(users, action)).toEqual([users[0], users[2]]);
    });
  });
});
