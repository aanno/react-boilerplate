import * as React from "react";
import Item from "./Item";
import Wrapper from "./Wrapper";
import {IReactNodeWithPropTypes} from "../../../custom-typings/custom-typings";

export interface IListItem {
  item: React.ReactNode,
  className?: string,
}

function ListItem(props: IListItem): IReactNodeWithPropTypes<IListItem> {
  const realListItem: any = function (props: IListItem) {
    return (
      <Wrapper>
        <Item>
          {props.item}
        </Item>
      </Wrapper>
    );
  }
  realListItem.propTypes = {
    item: React.PropTypes.any,
  };
  return realListItem(props);
}

export default ListItem;
