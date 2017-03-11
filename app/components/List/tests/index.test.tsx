import * as React from 'react';
import { render } from 'enzyme';

import ListItem from '../../../components/ListItem';
import List from '../index';
import {IReactElementConstructor} from "../../../../custom-typings/custom-typings";

describe('<List />', () => {
  it('should render the component if no items are passed', () => {
    const renderedComponent = render(
      <List component={ListItem} />
    );
    expect(renderedComponent.find(ListItem as any)).toBeDefined();
  });

  it('should render the items', () => {
    const items: Array<IReactElementConstructor> = [
      'Hello',
      'World',
    ];
    const renderedComponent = render(
      <List items={items} component={ListItem} />
    );
    expect(renderedComponent.find(items as any)).toBeDefined();
  });
});
