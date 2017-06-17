import React from 'react';
import { shallow } from 'enzyme';
import { Pagination } from 'react-materialize';

import { DocumentList } from '../../../components/document/DocumentList';
import DocumentContent from '../../../components/document/DocumentContent';
import Prompt from '../../../components/common/Prompt';


describe('DocumentLists component test', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      deleteDocument: jest.fn(() => ({ then: () => null })),
      fetchDocuments: jest.fn(() => 'fetchDocuments'),
      searchDocuments: jest.fn(() => 'searchDocuments'),
      updateDocument: jest.fn(() => 'updateDocuments'),

      documentDetails: {
        documents: {
          rows: [
            {
              id: 56,
              title: 'Amity all',
              content: 'Politics and Games',
              access: 'public',
              authorId: 7,
              createdAt: '2017-06-05T19:34:52.623Z',
              updatedAt: '2017-06-05T23:10:26.841Z'
            },
            {
              id: 57,
              title: 'Test',
              content: 'Test docs',
              access: 'public',
              authorId: 8,
              createdAt: '2017-06-05T19:34:52.623Z',
              updatedAt: '2017-06-05T23:10:26.841Z'
            },
          ],
        },
      },
      location: {
        pathname: '/documents'
      },
      currentUser: {
        userId: 7,
        roleId: 2,
        username: 'BossMan',
        email: 'bosun@yahoo.com',
        iat: 1496856809,
        exp: 1496943209
      },
    };

    wrapper = shallow(<DocumentList {...props} />);
  });

  describe('Base test', () => {
    beforeEach(() => {
      wrapper = shallow(<DocumentList {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('initializes state correctly', () => {
      expect(wrapper.state('id')).toBe('');
      expect(wrapper.state('title')).toBe('');
      expect(wrapper.state('content')).toEqual('');
      expect(wrapper.state('access')).toBe('public');
      expect(wrapper.state('authorId')).toBe('');
      expect(wrapper.state('docAccess')).toEqual(false);
    });
    it('content have tags removed', () => {
      const updatedDocument = Object.assign(
        {},
        props.documentDetails.documents.rows[1],
        { content: '<a>Hey world</a>' },
      );
      const updatedDocuments = props.documentDetails.documents
      .rows.concat(updatedDocument);
      props.documentDetails.documents.rows = updatedDocuments;
      wrapper.setProps(props);

      const thirdDocumentContent = wrapper.find(DocumentContent).at(2);
      expect(thirdDocumentContent).toHaveLength(1);
      expect(thirdDocumentContent.prop('content').props.children).toContain(
        'Hey world');
    });


    it('renders two cards to hold document', () => {
      expect(wrapper.find('.card')).toHaveLength(2);
    });

    it('renders DocumentContent with the two document contents passed in',
    () => {
      const firstDocumentContent = wrapper.find(DocumentContent).first();
      expect(firstDocumentContent).toHaveLength(1);
      expect(firstDocumentContent.prop('content')).toBe(
        props.documentDetails.documents.rows[0].content);

      const secondDocumentContent = wrapper.find(DocumentContent).at(1);
      expect(secondDocumentContent).toHaveLength(1);
      expect(secondDocumentContent.prop('content')).toBe(
        props.documentDetails.documents.rows[1].content);
    });

    it('does not render edit form for documents not owned by current user',
    () => {
      expect(wrapper.find('.card').at(1).find('form')).toHaveLength(0);
    });

    it('does not render delete prompt for documents not owned by current user',
    () => {
      expect(wrapper.find('.card').at(1).find(Prompt)).toHaveLength(0);
    });

    it('renders edit form for documents owned by current user', () => {
      expect(wrapper.find('.card').at(0).find('form')).toHaveLength(1);
    });

    it('renders delete prompt for documents owned by current user', () => {
      expect(wrapper.find('.card').at(0).find(Prompt)).toHaveLength(1);
    });

    it('displays no document when none is supplied', () => {
      props = Object.assign(
        {},
        props,
        { documentDetails: {} }
      );
      wrapper.setProps(props);
      expect(wrapper.find('div').at(1).text().toLowerCase()).toContain(
        '');
    });

    it('does not render pagination when null', () => {
      expect(wrapper.find(Pagination)).toHaveLength(0);
    });

    it('renders pagination when provided through props', () => {
      const newDocumentDetails = Object.assign(
        {},
        props.documentDetails,
        { pagination: { page_count: 4, total_count: 2 } },
      );
      const newProps = Object.assign(
        {},
        props,
        { documentDetails: newDocumentDetails }
      );
      wrapper.setProps(newProps);
      const pagination = wrapper.find(Pagination);
      expect(pagination).toHaveLength(1);
      expect(pagination.prop('items')).toBe(newDocumentDetails
      .pagination.page_count);
    });

    it('calls onSearch on entry of data to search form input', () => {
      wrapper.instance().onSearch = jest.fn(() => 'onSearch');
      const searchInput = wrapper.find('#doc-search');
      searchInput.simulate('change');
      expect(wrapper.instance().onSearch).toHaveBeenCalled();
    });

    it('calls searchDocuments on input change', () => {
      const searchInput = wrapper.find('#doc-search');
      searchInput.simulate('change', { target: { value: 'H' } });
      expect(props.searchDocuments).toHaveBeenCalledWith('H');
    });

    test('onChange method updates state', () => {
      const event = { target: { name: 'id', value: 2 } };
      wrapper.instance().onChange(event);
      expect(wrapper.state('id')).toBe(event.target.value);
    });

    test('onClick calls deleteDocument', () => {
      const event = {
        preventDefault: () => null,
      };
      wrapper.instance().onClick(event);
      expect(props.deleteDocument).toHaveBeenCalled();
    });

    test('onSelect calls fetchDocuments with offset', () => {
      wrapper.instance().onSelect(2);
      expect(props.fetchDocuments).toHaveBeenCalledWith(10);
    });
  });
});
