import * as React from "react";
import Ul from "./Ul";
import Wrapper from "./Wrapper";
import {IReactNodeWithPropTypes, ListItemType} from "../../../custom-typings/custom-typings";

export interface IList<T> {
  /*
  component: React.Component<any, any>,
  items?: React.Component<any, any>[],
   */
  component: React.ReactNode,
  items?: ListItemType<T>[],
}

export default function List<T>(props: IList<T>): IReactNodeWithPropTypes<IList<T>> {
  const realList: any = function(props: IList<T>) {
    const ComponentToRender: any = props.component;
    let content: any = (<div></div>);

    // If we have items, render them
    if (props.items) {
      content = props.items.map((item, index) => (
        <ComponentToRender key={`item-${index}`} item={item}/>
      ));
    } else {
      // Otherwise render a single component
      content = (<ComponentToRender />);
    }

    return (
      <Wrapper>
        <Ul>
          {content}
        </Ul>
      </Wrapper>
    );
  }
  realList.propTypes = {
    component: React.PropTypes.func.isRequired,
    items: React.PropTypes.array,
  };
  return realList(props);
}
