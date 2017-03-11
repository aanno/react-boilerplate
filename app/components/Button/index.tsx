/**
 *
 * Button.react.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import * as React from 'react';
import { PropTypes, Children } from 'react';

import A from './A';
import StyledButton from './StyledButton';
import Wrapper from './Wrapper';
import {IReactNodeWithPropTypes, IReactRoutedComponent} from "../../../custom-typings/custom-typings";

interface IButton extends IReactRoutedComponent {

  href: string,
  onClick: (e: Event) => void,
}

function Button(props: IButton): IReactNodeWithPropTypes<IButton> {

  const realButton: any = function(props: IButton) {
    // Render an anchor tag
    let button = (
      <A href={props.href} onClick={props.onClick}>
        {Children.toArray(props.children)}
      </A>
    );

    // If the Button has a handleRoute prop, we want to render a button
    if (props.handleRoute) {
      button = (
        <StyledButton onClick={props.handleRoute}>
          {Children.toArray(props.children)}
        </StyledButton>
      );
    }

    return (
      <Wrapper>
        {button}
      </Wrapper>
    );
  }
  realButton.propTypes = {
    handleRoute: PropTypes.func,
    href: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
  };
  return realButton(props);
}

export default Button;
