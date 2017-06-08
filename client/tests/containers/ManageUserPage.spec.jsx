import React from 'react';
import { shallow } from 'enzyme';

import { ManageUserPage } from '../../container/ManageUserPage';
import UserForm from '../../components/user/UserForm';

jest.mock('react-router', () => ({
  browserHistory: {
    push: () => null,
  },
}));

describe('ManageUserPage Container test', () => {
  let props;
  let wrapper;
  // let push;

  beforeEach(() => {
    props = {
      saveUser: jest.fn(() => 'saveUser'),
      fetchUser: jest.fn(() => 'fetchUser'),
      user: {
        firstName: 'sola',
        lastName: 'Aderonmu',
        email: 'sola@y.com',
        userName: 'sollyB',
        password: 123456,
        roleId: 2
      }
    };
  });

  describe('Base test', () => {
    beforeEach(() => {
      wrapper = shallow(<ManageUserPage {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('initializes state correctly', () => {
      expect(wrapper.state('errors')).toEqual({});
      expect(wrapper.state('saving')).toBe(false);
      expect(wrapper.state('user')).toEqual(props.user);
    });

    it('renders UserForm with the right props', () => {
      const userForm = wrapper.find(UserForm);
      expect(userForm).toHaveLength(1);
      expect(userForm.prop('user')).toEqual(wrapper.state('user'));
      expect(userForm.prop('onChange')).toBe(
        wrapper.instance().updateUserState);
      expect(userForm.prop('onSave')).toBe(
        wrapper.instance().saveUser);
      expect(userForm.prop('error')).toBe(wrapper.state('error'));
    });

    describe('updateUser State test case', () => {
      let event;

      beforeEach(() => {
        event = { target: { firstName: 'Victor',
          lastName: 'Ade',
          email: 'vic@y.com' } };
        wrapper = shallow(<ManageUserPage {...props} />);
      });
      it('updates role state with values provided in events', () => {
        wrapper.instance().updateUserState(event);
        expect(wrapper.state('user').firstName).toBe('sola');
        expect(wrapper.state('user').lastName).toBe('Aderonmu');
        expect(wrapper.state('user').email)
        .toBe('sola@y.com');
        expect(wrapper.state('user').userName)
        .toBe('sollyB');
      });

      describe('saveUser State test case', () => {
        beforeEach(() => {
          event = {
            target: { email: 'solaAde@y.com' },
            preventDefault: () => null,
          };
          wrapper = shallow(<ManageUserPage {...props} />);
        });
        it('save user state with values provided in events', () => {
          wrapper.instance().saveUser(event);
          expect(wrapper.state('user').userName).toBe('sollyB');
          expect(wrapper.state('user').firstName)
          .toBe('sola');
          expect(wrapper.state('user').password)
          .toBe(123456);
        });
      });
    });
  });
});
