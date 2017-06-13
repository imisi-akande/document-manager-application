import React from 'react';
import { shallow } from 'enzyme';
import { NavItem } from 'react-materialize';
import { Link } from 'react-router';


import LandingPage from '../../../components/common/LandingPage';

jest.mock('../../../img/doc-image.jpg', () => 'http://doc-image.jpg');

describe('Landing Page Component Test', () => {
  let wrapper;

  describe('Base Test', () => {
    beforeEach(() => {
      wrapper = shallow(<LandingPage />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });
    it('renders the Get started Link', () => {
      const brandLink = wrapper.find(Link);
      expect(brandLink).toHaveLength(1);
      expect(brandLink.prop('to')).toBe('/signup');
      expect(brandLink.html().toLowerCase()).toContain('get started');
    });
  });
})
  ;
