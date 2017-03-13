import * as React from 'react';
import { PropTypes } from 'react';
import styled, { keyframes } from 'styled-components';
import {IReactNodeWithPropTypes} from "../../../custom-typings/custom-typings";

export interface ICircle {
  delay: number,
  rotate: number,
}

const circleFadeDelay = keyframes`
  0%,
  39%,
  100% {
    opacity: 0;
  }

  40% {
    opacity: 1;
  }
`;

const Circle : (props: ICircle) => IReactNodeWithPropTypes<ICircle> = (props: ICircle) => {
  const realCircle: any = (props: ICircle) => {
    const CirclePrimitive = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    ${props.rotate && `
      -webkit-transform: rotate(${props.rotate}deg);
      -ms-transform: rotate(${props.rotate}deg);
      transform: rotate(${props.rotate}deg);
    `}

    &:before {
      content: '';
      display: block;
      margin: 0 auto;
      width: 15%;
      height: 15%;
      background-color: #999;
      border-radius: 100%;
      animation: ${circleFadeDelay} 1.2s infinite ease-in-out both;
      ${props.delay && `
        -webkit-animation-delay: ${props.delay}s;
        animation-delay: ${props.delay}s;
      `}
    }
  `;
    return <CirclePrimitive />;
  }
  realCircle.propTypes = {
    delay: PropTypes.number,
    rotate: PropTypes.number,
  };
  return realCircle(props);
};

export default Circle;
