import * as React from "react";
import {mount, ReactWrapper} from "enzyme";
import sinon from "sinon";
import withProgressBar, {
  IAppWithProgressState,
  AppWithProgressBarType,
  IAppWithProgressBar,
  IAppWithProgressBarComponent
} from "../index";
import ProgressBar from "../ProgressBar";
import {EnzymeMountType, ComponentClassLike} from "../../../../custom-typings/custom-typings";

type TestAppWithProgressBarType = EnzymeMountType<
  React.Component<IAppWithProgressBar, IAppWithProgressState>, IAppWithProgressBar, IAppWithProgressState>
    & IAppWithProgressBarComponent;

let clock: any = null;

describe('withProgressBar()', () => {
  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    /* clock = */sinon.restore({});
  });

  function Component(): ComponentClassLike<{}> {
    return (
      <div></div>
    );
  }

  const router = {
    listenBefore: () => (() => {}),
  };

  const HocComponent: any = withProgressBar(Component as any);

  it('Should exist', () => {
    const renderedComponent: TestAppWithProgressBarType = mount(
      <HocComponent />
    ) as TestAppWithProgressBarType;

    expect(renderedComponent.find(Component).length).toBe(1);
  });

  it('Should render <ProgressBar />', () => {
    const renderedComponent: TestAppWithProgressBarType = mount(
      <HocComponent />
    ) as TestAppWithProgressBarType;

    expect(renderedComponent.find(ProgressBar).length).toBe(1);
  });

  it('Should initially have state.progress = -1', () => {
    const renderedComponent: TestAppWithProgressBarType = mount(
      <HocComponent />
    ) as TestAppWithProgressBarType;

    const state: IAppWithProgressState = renderedComponent.state() as IAppWithProgressState;
    expect(state.progress).toBe(-1);
  });

  it('Should initially have state.loadedRoutes = current route', () => {
    const renderedComponent: TestAppWithProgressBarType = mount(
      <HocComponent location={{ pathname: '/' }} />
    ) as TestAppWithProgressBarType;

    const state: IAppWithProgressState = renderedComponent.state() as IAppWithProgressState;
    expect(state.loadedRoutes[0]).toBe('/');
  });

  it('Should listen to route changes', () => {
    const renderedComponent: TestAppWithProgressBarType = mount(
      <HocComponent location={{ pathname: '/' }} router={router} />
    ) as TestAppWithProgressBarType;

    const inst: AppWithProgressBarType = renderedComponent.instance();
    expect(inst.unsubscribeHistory).toBeTruthy();
  });

  it('Should unset listener when unmounted', () => {
    const renderedComponent: TestAppWithProgressBarType = mount(
      <HocComponent location={{ pathname: '/' }} router={router} />
    ) as TestAppWithProgressBarType;

    const inst: AppWithProgressBarType = renderedComponent.instance();
    inst.componentWillUnmount();
    expect(inst.unsubscribeHistory).toBeFalsy();
  });

  it('Should update state.progress when called updateProgress()', () => {
    const renderedComponent: AppWithProgressBarType & ReactWrapper<IAppWithProgressBar, IAppWithProgressState>
      = mount(
      <HocComponent location={{ pathname: '/' }} router={router}/>
    ) as TestAppWithProgressBarType;

    const inst: AppWithProgressBarType = renderedComponent.instance() as any;
    inst.updateProgress(10);
    const state: IAppWithProgressState = renderedComponent.state() as IAppWithProgressState;
    expect(state.progress).toBe(10);
  });

  it('Should start progress bar for a new route', () => {
    const renderedComponent: TestAppWithProgressBarType = mount(
      <HocComponent location={{ pathname: '/' }} router={router} />
    ) as TestAppWithProgressBarType;

    renderedComponent.setState({ loadedRoutes: [], progress: 10 });
    renderedComponent.setProps({ location: { pathname: '/abc' }, router });
    clock.tick(10);
    const state: IAppWithProgressState = renderedComponent.state() as IAppWithProgressState;
    expect(state.progress).toBe(100);
  });
});
