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
  const user = [{
    id: 2,
    name: 'Ayoola Ajose',
    email: 'ayoola.ajose@andela.com',
    privacy: 'public',
    createdAt: '2017-05-20T14:01:51.891Z',
    updatedAt: '2017-06-03T11:48:54.226Z',
    roleId: 2,
  }];


  it('has the default initial state', () => {
    expect(userReducer([], { type: '' })).toEqual([]);
  });

  it('handles CREATE_USER_SUCCESS action', () => {
    const action = {
      type: 'CREATE_USER_SUCCESS',
      user
    };

    const expectedOutcome = [{
      createdAt: '2017-05-20T14:01:51.891Z',
      email: 'ayoola.ajose@andela.com',
      id: 2,
      name: 'Ayoola Ajose',
      privacy: 'public',
      roleId: 2,
      updatedAt: '2017-06-03T11:48:54.226Z'
    }];
    expect(userReducer([], action)).toEqual(expectedOutcome);
  });

  it('handles LOAD_USER_SUCCESS action', () => {
    const action = {
      type: types.LOAD_USER_SUCCESS,
      users: usersInDatabase.users
    };

    const expectOutcome = { rows:
    [{
      createdAt: '2017-05-20T14:01:51.891Z',
      email: 'imisioluwa.akande@andela.com',
      id: 1,
      name: 'Akande Imisioluwa',
      privacy: 'public',
      roleId: 1,
      updatedAt: '2017-06-03T11:48:54.226Z'
    }, {
      createdAt: '2017-05-20T14:01:51.891Z',
      email: 'ayoola.ajose@andela.com',
      id: 2,
      name: 'Ayoola Ajose',
      privacy: 'public',
      roleId: 2,
      updatedAt: '2017-06-03T11:48:54.226Z'
    }]
    };
    expect(userReducer([], action)).toEqual(expectOutcome);
  });
});
