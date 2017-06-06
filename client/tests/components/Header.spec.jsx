import React from 'react';
import { shallow } from 'enzyme';
import { NavItem } from 'react-materialize';
import { IndexLink } from 'react-router';

import Header from '../../components/common/Header';


jest.mock('jwt-decode', () => () => ({ roleId: 1 }));


describe('Header Component Test', () => {
  let wrapper;

  describe('Base Test', () => {
    beforeEach(() => {
      wrapper = shallow(<Header />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('renders Index Link', () => {
      const brandLink = wrapper.find(IndexLink);
      expect(brandLink).toHaveLength(1);
      expect(brandLink.prop('to')).toBe('/');
      expect(brandLink.html().toLowerCase()).toContain('smartdocx');
    });

    it('renders authenticated-nav when there is a token', () => {
      expect(wrapper.find('#authenticated-nav')).toHaveLength(1);
    });

    it('renders Add User link for admin user', () => {
      const navItem = wrapper.find(NavItem).at(3);
      expect(navItem.html().toLowerCase()).toContain('add user');
    });

    it('renders Add Role link for admin user', () => {
      const navItem = wrapper.find(NavItem).at(10);
      expect(navItem.html().toLowerCase()).toContain('add role');
    });

    it('renders Roles link for admin user', () => {
      const navItem = wrapper.find(NavItem).at(12);
      expect(navItem.html().toLowerCase()).toContain('roles');
    });
  });

  describe('Unauthenticated Test Cases', () => {
    beforeEach(() => {
      const getItem = () => null;
      global.localStorage = { getItem };
      wrapper = shallow(<Header />);
    });

    it('does not render authenticated-nav when no token', () => {
      expect(wrapper.find('#authenticated-nav')).toHaveLength(0);
    });

    it('renders unauthenticated-nav when no token', () => {
      expect(wrapper.find('#unauthenticated-nav')).toHaveLength(1);
    });
  });
});
