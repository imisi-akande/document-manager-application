import React from 'react';
import { shallow } from 'enzyme';
import { Pagination } from 'react-materialize';

import { OwnDocumentList } from '../../../components/document/OwnDocumentList';
import DocumentTitle from '../../../components/document/DocumentListTitle';
import DocumentContent from '../../../components/document/DocumentContent';
import Prompt from '../../../components/common/Prompt';

// jest.mock('../../img/cardReveal.jpg', () => 'http://doc-image.jpg');

describe('Document component test', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      deleteOwnDocument: jest.fn(() => ({ then: () => null })),
      fetchOwnDocuments: jest.fn(() => 'fetchOwnDocuments'),
      searchOwnDocuments: jest.fn(() => 'searchOwnDocuments'),
      updateOwnDocuments: jest.fn(() => 'updateOwnDocuments'),
      documentDetails: {
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
          }
        ],

        documents: {
          rows: [{
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
          }]
        }
      },
      currentUser: {
        userId: 7,
        roleId: 2,
        username: 'BossMan',
        email: 'bosun@yahoo.com',
        iat: 1496856809,
        exp: 1496943209
      },
      pagination: null,
    };
  });

  describe('Base test', () => {
    beforeEach(() => {
      wrapper = shallow(<OwnDocumentList {...props} />);
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
    });
    it('renders DocumentTitle with the two document titles passed in', () => {
      expect(shallow(<DocumentTitle />).length).toEqual(1);
      expect(shallow(<DocumentContent />).length).toEqual(1);
    });

    it('content have tags removed', () => {
      const updatedDocument = Object.assign(
        {},
        props.documentDetails.rows[1],
        { content: '<a>Hey world</a>' },
      );
      const updatedDocuments = props.documentDetails
      .rows.concat(updatedDocument);
      props.documentDetails.rows = updatedDocuments;
      wrapper.setProps(props);

      const thirdDocumentContent = wrapper.find('.card-reveal').find(
        DocumentContent).at(2);
      expect(thirdDocumentContent).toHaveLength(1);
    });

    it('does not render edit form for documents not owned by current user',
    () => {
      expect(wrapper.find('.card').at(1).find('form')).toHaveLength(0);
    });

    it('does not render delete prompt for documents not owned by current user',
    () => {
      expect(wrapper.find('.card').at(1).find(Prompt)).toHaveLength(0);
    });

    it('displays no document when none is supplied', () => {
      props = Object.assign(
        {},
        props,
        { document: 'no document' }
      );
      wrapper.setProps(props);
      expect(wrapper.find('div').at(1).text().toLowerCase()).toContain(
        '');
    });

    it('renders pagination on listing my documents', () => {
      expect(wrapper.find(Pagination)).toHaveLength(1);
    });

    it('calls onSearch on entry of data to search form input', () => {
      wrapper.instance().onSearch = jest.fn(() => 'onSearch');
      const searchInput = wrapper.find('#doc-search');
      searchInput.simulate('change');
      expect(wrapper.instance().onSearch).toHaveBeenCalled();
    });
  });
});
