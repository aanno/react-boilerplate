import * as React from 'react';

import Ul from './Ul';
import Wrapper from './Wrapper';
import {IReactNodeWithPropTypes} from "../../../custom-typings/custom-typings";

interface IList {
  /*
  component: React.Component<any, any>,
  items?: React.Component<any, any>[],
   */
  component: () => JSX.Element,
  items?: Array<() => JSX.Element>,
}

function List(props: IList): IReactNodeWithPropTypes<IList> {
  const realList: any = function(props: IList) {
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

export default List;
