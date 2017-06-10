import React from 'react';
import { shallow, mount } from 'enzyme';

import RoleList from '../../components/role/RoleList';
import { RoleListRow } from '../../components/role/RoleListRow';

describe('Role List component test', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      document: null,
      roles: [
        {
          id: 1,
          title: 'role 1'
        },
        {
          id: 2,
          title: 'role 2'
        }
      ],
      deleteRole: jest.fn(() => 'deleteRole'),
    };
  });

  describe('Base test', () => {
    beforeEach(() => {
      wrapper = shallow(<RoleList {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('initializes state correctly', () => {
      props = {
        role: {
          id: 1,
          title: 'role 1'
        },
        deleteRole: jest.fn(() => 'deleteRole'),
      };
<<<<<<< HEAD
      wrapper = mount(<RoleListRow {...props} />);
=======
      const wrapper = mount(<RoleListRow {...props} />);
>>>>>>> ea13d949cf20c7c8ba381ff5a9c3d43f13bfe365
      const titlehead = wrapper.find('.role-title');

      expect(titlehead.text()).toBe('role 1');
      expect(titlehead.text()).not.toBe('jajaj');
      // expect(wrapper.state('roles').role).toBe({});
      // expect(wrapper.state('roles').deleteRole).toBe({});
    });
  });
});
