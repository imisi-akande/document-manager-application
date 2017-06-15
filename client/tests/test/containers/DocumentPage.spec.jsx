import React from 'react';
import { shallow } from 'enzyme';

import { DocumentList } from '../../../components/document/DocumentList';


import { DocumentPage } from '../../../container/DocumentPage';


describe('DocumentPage container test', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      fetchDocuments: jest.fn(() => 'fetchDocuments'),
      documentSaver: jest.fn(() => 'documentSaver'),
      updateDocument: jest.fn(() => 'updateDocument'),
    };
  });

  describe('Base test', () => {
    beforeEach(() => {
      wrapper = shallow(<DocumentPage {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });
    it('initializes state correctly', () => {
      expect(wrapper.state('title')).toBe('');
      expect(wrapper.state('content')).toBe('');
      expect(wrapper.state('access')).toBe('');
      expect(wrapper.state('authorId')).toBe('');
    });
    
    describe('ComponentDidMount test case', () => {
      let event;

      beforeEach(() => {
        event = { target: { name: 'title', value: 'talent' } };
        wrapper = shallow(<DocumentPage {...props} />);
      });
      it('fetch document state with values provided in events', () => {
        event = { target: { getContent: () => 'Talent Accelerator!' } };
        wrapper = shallow(<DocumentPage {...props} />);
      });
    });
  });
});
