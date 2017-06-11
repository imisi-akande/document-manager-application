import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { Login } from '../../components/authentication/Login';
import DocumentContainer from '../../container/DocumentContainer';

describe('Login component test', () => {
  let props;
  let wrapper;

  describe('Login component', () => {
    it('should render', () => {
      const component = shallow(
        <Login />
      );

      expect(component.length).toEqual(1);
    });

    it('should render', () => {
      const component = shallow(
        <Login login={() => jest.fn()} />
      );

      const loginForm = component.instance();

      const onClickSaveStub = sinon.stub(loginForm, 'onClickSave');
      loginForm.forceUpdate();

      const button = component.find('button');
      button.simulate('click');

      expect(onClickSaveStub.calledOnce).toEqual(true);
      expect(onClickSaveStub.callCount).toEqual(1);
      expect(onClickSaveStub.args[0]).toEqual([]);
    });

    it('should change email state', () => {
      const component = shallow(
        <Login login={() => jest.fn()} />
      );

      expect(component.state().email).toEqual('');
      component.instance().onEmailChange({ target: { value: 'mufu@yahooyahoo.com' } });
      expect(component.state().email).toEqual('mufu@yahooyahoo.com');
    });

    it('should change password state', () => {
      const component = shallow(
        <Login login={() => jest.fn()} />
      );

      expect(component.state().password).toEqual('');
      component.instance().onPasswordChange({ target: { value: '12345678' } });
    });

    it('loginAction should be called', () => {
      const loginStub = sinon.spy(() => {});

      const component = shallow(
        <Login login={loginStub} />
      );

      component.instance().onClickSave();
      expect(loginStub.calledOnce).toEqual(true);
      expect(loginStub.callCount).toEqual(1);
    });
  });
});
