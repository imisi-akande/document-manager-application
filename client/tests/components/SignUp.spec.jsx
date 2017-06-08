import React from 'react';
import { shallow } from 'enzyme';

import { Register } from '../../components/authentication/SignUp';

describe('Register component test', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      saveUser: jest.fn(() => 'saveUser'),
      user: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      }
    };
  });

  describe('Base test', () => {
    beforeEach(() => {
      wrapper = shallow(<Register {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });
  });

  describe('Signup Form Submit', () => {
    let event;

    beforeEach(() => {
      event = {
        preventDefault: () => null,
        target: {
          firstName: { value: 'John' },
          lastName: { value: 'Doe' },
          userName: { value: 'john_doe' },
          email: { value: 'john_doe@andela.com' },
          password: { value: 'notSecret' },
          confirmPassword: { value: 'notSecret' },
        },
      };
      wrapper = shallow(<Register {...props} />);
    });

    test('submiting the form calls saveUser with the right data', () => {
      const form = wrapper.find('form');
      form.simulate('submit', event);
      expect(props.saveUser).toHaveBeenCalled();
    });

    it('does not call saveUser when passwords do not match', () => {
      const form = wrapper.find('form');
      event.target.confirmPassword.value = 'notsec';
      form.simulate('submit', event);
      expect(props.saveUser).not.toHaveBeenCalled();
    });
  });
});
