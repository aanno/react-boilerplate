import * as React from 'react';
import { mount } from 'enzyme';

import Circle from '../Circle';
import {ReactTestProps} from "../../../../custom-typings/custom-typings";
import {ICircle} from "../Circle";

describe('<Circle />', () => {
  it('should render an <div> tag', () => {
    const props: ReactTestProps<ICircle> = {};
    const renderedComponent = mount(<Circle {...props} />);
    expect(renderedComponent.find('div').length).toEqual(1);
  });

  it('should have a className attribute', () => {
    const props: ReactTestProps<ICircle> = {};
    const renderedComponent = mount(<Circle {...props} />);
    expect(renderedComponent.find('div').prop('className')).toBeDefined();
  });

  it('should not adopt attributes', () => {
    const id = 'test';
    const props: ReactTestProps<ICircle> = {};
    const Untyped: any = Circle;
    const renderedComponent = mount(<Untyped {...props} id={id} />);
    expect(renderedComponent.find('div').prop('id')).toBeUndefined();
  });
});
