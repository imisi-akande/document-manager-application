import React from 'react';
import { shallow } from 'enzyme';

import { Login } from '../../components/authentication/Login';
import DocumentContainer from '../../container/DocumentContainer';

describe('Login component test', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      user: {
        email: '',
        password: '',
        login: jest.fn(() => 'login'),
      }
    };
  });

  describe('Base test', () => {
    beforeEach(() => {
      wrapper = shallow(<Login {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });
  });

  describe('Login Form Submit', () => {
    let event;
    beforeEach(() => {
      event = {
        preventDefault: () => null,
        target: {
          email: { value: 'john_doe@andela.com' },
          password: { value: 'notSecret' },
        },
      };
      wrapper = shallow(<Login {...props} />);
    });
  });
});
