import * as React from 'react';
import { mount, render } from 'enzyme';

import A from '../A';

describe('<A />', () => {
  it('should render an <a> tag', () => {
    const renderedComponent = render(<A />);
    expect(renderedComponent.find('a').length).toEqual(1);
  });

  it('should have a className attribute', () => {
    const renderedComponent = mount(<A />);
    expect(renderedComponent.find('a').prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = mount(<A id={id} />);
    expect(renderedComponent.find('a').prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const Untyped: any = A;
    const renderedComponent = mount(<Untyped attribute={'test'} />);
    expect(renderedComponent.find('a').prop('attribute')).toBeUndefined();
  });
});
