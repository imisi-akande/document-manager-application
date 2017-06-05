import React from 'react';
import { mount, shallow } from 'enzyme';
import expect from 'expect';
import App from '../../container/App';

describe('Role container Test via Enzyme', () => {
    const wrapper = shallow(<App />);
    it('should render a `container-fluid` element', () => {
        expect(wrapper.node.props.className).toBe('container-fluid');
    });

    it('should have a `Header` children componet', () => {
        expect(wrapper.find('Header').length).toBeGreaterThanOrEqualTo(1);
    });
});
