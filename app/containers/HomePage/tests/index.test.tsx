/**
 * Test the HomePage
 */

import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import ReposList from '../../../components/ReposList';
import {HomePage, mapDispatchToProps, IHomePage} from '../index';
import { changeUsername } from '../actions';
import { loadRepos } from '../../App/actions';
import {ReactTestProps} from "../../../../custom-typings/custom-typings";
import {TestEventTarget, TestFormEvent, TestEvent} from "../../../types/types";

describe('<HomePage />', () => {
  it('should render the repos list', () => {
    const props: ReactTestProps<IHomePage> = {};
    const renderedComponent = shallow(
      <HomePage {...props} loading error={undefined} repos={[]} />
    );
    expect(renderedComponent.contains(<ReposList loading error={undefined} repos={[]} />)).toEqual(true);
  });

  it('should render fetch the repos on mount if a username exists', () => {
    const submitSpy = jest.fn();
    const props: ReactTestProps<IHomePage> = {};
    mount(
      <IntlProvider locale="en">
        <HomePage
          {...props}
          username="Not Empty"
          onChangeUsername={((() => {}) as any)}
          onSubmitForm={submitSpy}
        />
      </IntlProvider>
    );
    expect(submitSpy).toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    describe('onChangeUsername', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeUsername).toBeDefined();
      });

      it('should dispatch changeUsername when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const username = 'mxstbr';
        const target: EventTarget & Element = (new TestEventTarget<string>(username) as any);
        const formEvent = new TestFormEvent(target);
        result.onChangeUsername(formEvent);
        expect(dispatch).toHaveBeenCalledWith(changeUsername(username));
      });
    });
  });

  describe('onSubmitForm', () => {
    it('should be injected', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.onSubmitForm).toBeDefined();
    });

    it('should dispatch loadRepos when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.onSubmitForm();
      expect(dispatch).toHaveBeenCalledWith(loadRepos());
    });

    it('should preventDefault if called with event', () => {
      const preventDefault = jest.fn();
      const result = mapDispatchToProps(() => {});
      // const evt: Event = { preventDefault };
      const evt: Event = new TestEvent(new TestEventTarget<any>({}))
      result.onSubmitForm(evt);
      expect(preventDefault).toHaveBeenCalledWith();
    });
  });
});
