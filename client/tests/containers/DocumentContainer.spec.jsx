import React from 'react';
import { shallow } from 'enzyme';

import DocumentForm from '../../components/document/DocumentForm';
import DocumentMarkDown from '../../components/document/DocumentMarkDown';

import { DocumentContainer } from '../../container/DocumentContainer';


describe('Document Container test', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      document: null,
      fetchDocuments: jest.fn(() => 'fetchDocuments'),
      documentSaver: jest.fn(() => 'documentSaver'),
    };
  });

  describe('Base test', () => {
    beforeEach(() => {
      wrapper = shallow(<DocumentContainer {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('initializes state correctly', () => {
      expect(wrapper.state('document').title).toBe('');
      expect(wrapper.state('document').content).toBe('');
      expect(wrapper.state('document').access).toBe('public');
      expect(wrapper.state('saving')).toBe(false);
    });

    it('renders DocumentForm with the right props', () => {
      const documentForm = wrapper.find(DocumentForm);
      expect(documentForm).toHaveLength(1);
      expect(documentForm.prop('document')).toBe(wrapper.state('document'));
      expect(documentForm.prop('onChange')).toBe(
        wrapper.instance().updateDocumentState);
      expect(documentForm.prop('onSave')).toBe(
        wrapper.instance().handleFormSubmit);
      expect(documentForm.prop('errors')).toBe(wrapper.state('error'));
    });

    it('renders DocumentMarkdown with the right props', () => {
      const documentMarkDown = wrapper.find(DocumentMarkDown);
      expect(documentMarkDown).toHaveLength(1);
      expect(documentMarkDown.prop('document')).toBe(wrapper.state('document'));
      expect(documentMarkDown.prop('onChange')).toBe(
        wrapper.instance().handleEditorChange);
    });

    it('calls documentSaver when form is submitted and updates saving to true',
    () => {
      const submitButton = wrapper.find('[name="btn_login"]');
      expect(submitButton).toHaveLength(1);


      submitButton.simulate('click', { preventDefault: () => null });
      expect(props.documentSaver).toHaveBeenCalled();
      expect(wrapper.state('saving')).toBe(true);
    });
  });

  describe('updateDocumentState test case', () => {
    let event;

    beforeEach(() => {
      event = { target: { name: 'title', value: 'talent' } };
      wrapper = shallow(<DocumentContainer {...props} />);
    });

    it('updates document state with values provided in events', () => {
      wrapper.instance().updateDocumentState(event);
      expect(wrapper.state('document').title).toBe(event.target.value);
    });
  });

  describe('handleEditorChange test case', () => {
    let event;

    beforeEach(() => {
      event = { target: { getContent: () => 'Hello there!' } };
      wrapper = shallow(<DocumentContainer {...props} />);
    });

    it('updates content of the document state with values gotten from events',
    () => {
      wrapper.instance().handleEditorChange(event);
      expect(wrapper.state('document').content).toBe('Hello there!');
    });
  });
});
