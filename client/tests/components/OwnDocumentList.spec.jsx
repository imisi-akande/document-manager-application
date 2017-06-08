import React from 'react';
import { shallow } from 'enzyme';
import { Pagination } from 'react-materialize';

import { OwnDocumentList } from '../../components/document/OwnDocumentList';
import DocumentTitle from '../../components/document/DocumentListTitle';
import DocumentContent from '../../components/document/DocumentContent';
import Prompt from '../../components/common/Prompt';

jest.mock('../../img/cardReveal.jpg', () => 'http://doc-image.jpg');

describe('Document component test', () => {
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
    it('renders two cards to hold document', () => {
      expect(wrapper.find('.card')).toHaveLength(2);
    });
  });
});
