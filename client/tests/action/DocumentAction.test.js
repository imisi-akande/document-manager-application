import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import * as documentActions from '../actions/documentAction';
import * as types from '../actions/actionTypes';


describe('DOCUMENT ACTION', () => {
    describe('createUser', () => {
        it('should create a CREATE_DOCUMENT action', () => {
            const document = {title: 'ngozi', content: 'rose', access: 'rgirl', userId: 2}
            const expectedAction = {
                type: types.CREATE_DOCUMENT,
                document
            };
            const action = documentActions.createDocument(document);
            expect(action).toEqual(expectedAction);
        });
    });

});