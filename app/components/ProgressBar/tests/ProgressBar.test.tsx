import * as React from "react";
import sinon from "sinon";
import {shallow, mount} from "enzyme";
import ProgressBar, {IProgressBar, IProgressBarState} from "../ProgressBar";
import Wrapper from "../Wrapper";
import Percent from "../Percent";
import {ReactTestProps} from "../../../../custom-typings/custom-typings";
import SinonSpy = sinon.SinonSpy;

let clock: any = null;

describe('<ProgressBar />', () => {
  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    /*clock = */sinon.restore();
  });

  it('should initially render hidden progress bar', () => {
    const props: ReactTestProps<IProgressBar> = {};
    const renderedComponent = shallow(
      <ProgressBar {...props} />
    );
    expect(renderedComponent.find(Wrapper).length).toEqual(1);
  });

  it('should render render horizontal progress bar', () => {
    const props: ReactTestProps<IProgressBar> = {};
    const renderedComponent = shallow(
      <ProgressBar {...props} />
    );
    expect(renderedComponent.find(Percent).length).toEqual(1);
  });

  it('should set state.percent as props.percent', () => {
    const expected = 50;
    const props: ReactTestProps<IProgressBar> = {};
    const renderedComponent = mount(
      <ProgressBar {...props} percent={expected} />
    );
    const state: IProgressBarState = renderedComponent.state() as IProgressBarState;
    expect(state.percent).toEqual(expected);
  });

  it('should call componentDidMount', () => {
    sinon.spy(ProgressBar.prototype, 'componentDidMount');
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={0} updateProgress={(noop) => noop} />
    );
    expect((ProgressBar.prototype.componentDidMount as SinonSpy).calledOnce).toEqual(true);
    (ProgressBar.prototype.componentDidMount as SinonSpy).restore();
  });

  it('should call componentWillReceiveProps', () => {
    sinon.spy(ProgressBar.prototype, 'componentWillReceiveProps');
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={0} updateProgress={(noop) => noop} />
    );
    renderedComponent.setProps({ percent: 50 });
    expect((ProgressBar.prototype.componentWillReceiveProps as SinonSpy).calledOnce).toEqual(true);
    (ProgressBar.prototype.componentWillReceiveProps as SinonSpy).restore();
  });

  it('should unset ProgressBar.interval after getting new props', () => {
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={0} updateProgress={(noop) => noop} />
    );
    const inst: ProgressBar = renderedComponent.instance() as ProgressBar;

    clock.tick(1000);
    expect(inst.interval).toBeDefined();
    inst.componentWillReceiveProps({ percent: 50 } as IProgressBar);
    expect(inst.interval).toBeUndefined();
  });

  it('should unset ProgressBar.timeout after getting new props', () => {
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={100} updateProgress={(noop) => noop} />
    );
    const inst: ProgressBar = renderedComponent.instance() as ProgressBar;

    clock.tick(1000);
    expect(inst.timeout).toBeDefined();
    inst.componentWillReceiveProps({ percent: 50 } as IProgressBar);
    expect(inst.timeout).toBeUndefined();
  });

  it('should set state to -1 after new route mounts', () => {
    const renderedComponent = mount(
      <ProgressBar percent={0} updateProgress={(noop) => noop} />
    );
    renderedComponent.setProps({ percent: 100 });
    clock.tick(501);
    const state: IProgressBarState = renderedComponent.state() as IProgressBarState;
    expect(state.percent).toEqual(-1);
  });

  it('should call componentWillUnmount', () => {
    sinon.spy(ProgressBar.prototype, 'componentWillUnmount');
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={0} updateProgress={(noop) => noop} />
    );
    renderedComponent.unmount();
    expect((ProgressBar.prototype.componentWillUnmount as SinonSpy).calledOnce).toEqual(true);
    (ProgressBar.prototype.componentWillUnmount as SinonSpy).restore();
  });

  it('should unset ProgressBar.interval after unmounting', () => {
    sinon.spy(ProgressBar.prototype, 'componentWillUnmount');
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={0} updateProgress={(noop) => noop} />
    );
    const inst: ProgressBar = renderedComponent.instance() as ProgressBar;

    clock.tick(1000);
    expect(inst.interval).toBeDefined();
    renderedComponent.unmount();
    expect(inst.interval).toBeUndefined();
    (ProgressBar.prototype.componentWillUnmount as SinonSpy).restore();
  });

  it('should unset ProgressBar.timeout after unmounting', () => {
    sinon.spy(ProgressBar.prototype, 'componentWillUnmount');
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={100} updateProgress={(noop) => noop} />
    );
    const inst: ProgressBar = renderedComponent.instance() as ProgressBar;

    clock.tick(1000);
    expect(inst.timeout).toBeDefined();
    renderedComponent.unmount();
    expect(inst.timeout).toBeUndefined();
    (ProgressBar.prototype.componentWillUnmount as SinonSpy).restore();
  });

  describe('increment progress', () => {
    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      /*clock = */sinon.restore({});
    });

    it('should start incrementing progress if 0 <= percent < 100', () => {
      const initialPercent = 50;
      const renderedComponent = mount(
        <ProgressBar percent={initialPercent} updateProgress={(noop) => noop} />
      );
      clock.tick(1000);
      const state: IProgressBarState = renderedComponent.state() as IProgressBarState;
      expect(state.percent).toBeGreaterThan(initialPercent);
    });

    it('should stop incrementing progress if percent >= 100', () => {
      const initialPercent = 100;
      const expected = -1;
      const renderedComponent = mount(
        <ProgressBar percent={initialPercent} updateProgress={(noop) => noop} />
      );
      clock.tick(1000);
      const state: IProgressBarState = renderedComponent.state() as IProgressBarState;
      expect(state.percent).toEqual(expected);
    });
  });
});
