import * as React from "react";
import {mount} from "enzyme";
import ListItem, {IListItem} from "../index";
import {ReactTestProps} from "../../../../custom-typings/custom-typings";

describe('<ListItem />', () => {
  it('should have a className', () => {
    const props: ReactTestProps<IListItem> = {} as ReactTestProps<IListItem>;
    const renderedComponent = mount(<ListItem { ...props} className="test" />);
    expect(renderedComponent.find('li').prop('className')).toBeDefined();
  });

  it('should render the content passed to it', () => {
    const content = (<div>Hello world!</div>);
    const renderedComponent = mount(
      <ListItem item={content} />
    );
    expect(renderedComponent.contains(content)).toBe(true);
  });
});
