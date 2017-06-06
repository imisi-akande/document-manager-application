import React from 'react';
import { mount, shallow } from 'enzyme';

import { ManageRolePage } from '../../container/ManageRolePage';
import RoleForm from '../../components/role/RoleForm';


describe('Role  Container  test', () => {
  let context;
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      saveRole: jest.fn(() => 'saveRole'),
      role: {
        id: 2,
        title: 'regular',
        createdAt: '2017-05-23T17:00:14.198Z',
        updatedAt: '2017-05-23T17:00:14.198Z',
      }
    };

    context = {
      router: {
        push: () => jest.fn(() => 'push'),
      },
    };
  });

  describe('Base test', () => {
    beforeEach(() => {
      wrapper = shallow(<ManageRolePage {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('initializes state correctly', () => {
      expect(wrapper.state('errors')).toEqual({});
      expect(wrapper.state('saving')).toBe(false);
      expect(wrapper.state('role')).toEqual(props.role);
    });

    it('renders RoleForm with the right props', () => {
      const roleForm = wrapper.find(RoleForm);
      expect(roleForm).toHaveLength(1);
      expect(roleForm.prop('role')).toEqual(wrapper.state('role'));
      expect(roleForm.prop('onChange')).toBe(
        wrapper.instance().updateRoleState);
      expect(roleForm.prop('onSave')).toBe(
        wrapper.instance().saveRole);
      expect(roleForm.prop('error')).toBe(wrapper.state('error'));
    });

    describe('updateRole State test case', () => {
      let event;

      beforeEach(() => {
        event = { target: { id: '52', title: 'public' } };
        wrapper = shallow(<ManageRolePage {...props} />);
      });

      it('updates role state with values provided in events', () => {
        wrapper.instance().updateRoleState(event);
        expect(wrapper.state('role').id).toBe(2);
        expect(wrapper.state('role').title).toBe('regular');
        expect(wrapper.state('role').createdAt).toBe('2017-05-23T17:00:14.198Z');
        expect(wrapper.state('role').updatedAt).toBe('2017-05-23T17:00:14.198Z');
      });
      describe('saveRole State test case', () => {
        let event;

        beforeEach(() => {
          // event = { target: { id: '50' } };
          event = { target: { id: '50' }, preventDefault: () => null };
          wrapper = shallow(<ManageRolePage {...props} />, { context });
        });

        it('save role state with values provided in events', () => {
          wrapper.instance().saveRole(event);
          // console.log(wrapper.state())
          // wrapper.setState({ role: Object.assign({}, wrapper.state(), { title: 'Guest' }) });
          // console.log(wrapper.state());
          expect(wrapper.state('role').title).toBe('regular');
          expect(wrapper.state('role').createdAt).toBe('2017-05-23T17:00:14.198Z');
          expect(wrapper.state('role').updatedAt).toBe('2017-05-23T17:00:14.198Z');
        });
      });
    });
  });
});
