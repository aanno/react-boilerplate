import * as React from "react";
import {mount, ReactWrapper} from "enzyme";
import sinon from "sinon";
import withProgressBar, {IAppWithProgressState, AppWithProgressBarType, IAppWithProgressBar} from "../index";
import ProgressBar from "../ProgressBar";

let clock: any = null;

describe('withProgressBar()', () => {
  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    /* clock = */sinon.restore();
  });

  function Component() {
    return (
      <div></div>
    );
  }

  const router = {
    listenBefore: () => (() => {}),
  };

  const HocComponent = withProgressBar(Component);

  it('Should exist', () => {
    const renderedComponent = mount(
      <HocComponent />
    );

    expect(renderedComponent.find(Component).length).toBe(1);
  });

  it('Should render <ProgressBar />', () => {
    const renderedComponent = mount(
      <HocComponent />
    );

    expect(renderedComponent.find(ProgressBar).length).toBe(1);
  });

  it('Should initially have state.progress = -1', () => {
    const renderedComponent = mount(
      <HocComponent />
    );

    expect(renderedComponent.state().progress).toBe(-1);
  });

  it('Should initially have state.loadedRoutes = current route', () => {
    const renderedComponent = mount(
      <HocComponent location={{ pathname: '/' }} />
    );

    expect(renderedComponent.state().loadedRoutes[0]).toBe('/');
  });

  it('Should listen to route changes', () => {
    const renderedComponent = mount(
      <HocComponent location={{ pathname: '/' }} router={router} />
    );

    const inst: AppWithProgressBarType = renderedComponent.instance();
    expect(inst.unsubscribeHistory).toBeTruthy();
  });

  it('Should unset listener when unmounted', () => {
    const renderedComponent = mount(
      <HocComponent location={{ pathname: '/' }} router={router} />
    );

    const inst: AppWithProgressBarType = renderedComponent.instance();
    inst.componentWillUnmount();
    expect(inst.unsubscribeHistory).toBeFalsy();
  });

  it('Should update state.progress when called updateProgress()', () => {
    const renderedComponent: AppWithProgressBarType & ReactWrapper<IAppWithProgressBar, IAppWithProgressState>
      = mount(
      <HocComponent location={{ pathname: '/' }} router={router}/>
    ) as any;

    const inst: AppWithProgressBarType = renderedComponent.instance() as any;
    inst.updateProgress(10);
    const state: IAppWithProgressState = renderedComponent.state() as IAppWithProgressState;
    expect(state.progress).toBe(10);
  });

  it('Should start progress bar for a new route', () => {
    const renderedComponent = mount(
      <HocComponent location={{ pathname: '/' }} router={router} />
    );

    renderedComponent.setState({ loadedRoutes: [], progress: 10 });
    renderedComponent.setProps({ location: { pathname: '/abc' }, router });
    clock.tick(10);
    const state: IAppWithProgressState = renderedComponent.state() as IAppWithProgressState;
    expect(state.progress).toBe(100);
  });
});
