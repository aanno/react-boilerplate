/**
 *
 * Img.react.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */
import * as React from 'react';
import { PropTypes } from 'react';
import {IReactNodeWithPropTypes} from "../../../custom-typings/custom-typings";

interface IImg {
  className: string,
  src: string,
  alt: string,
}

function Img(props: IImg): IReactNodeWithPropTypes<IImg> {
  const realImg: any = function(props:IImg) {
    return (
      <img className={props.className} src={props.src} alt={props.alt}/>
    );
  };
  // We require the use of src and alt, only enforced by react in dev mode
  realImg.propTypes = {
    src: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
  };
  return realImg(props);
}

export default Img;
