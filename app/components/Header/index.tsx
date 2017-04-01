import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
// import Banner from 'banner.jpg';
import messages from './messages';
import * as log from 'loglevel';
import {ROUTE_PREFIX} from "../../config/config"

// TODO (tp): no idea why the import does not work
const Banner = require('./banner.jpg')

interface IHeader {

}

class Header extends React.Component<IHeader, {}> { // eslint-disable-line react/prefer-stateless-function

  render() {
    log.debug('Header: Banner is', Banner);
    return (
      <div>
        <A href="https://twitter.com/mxstbr">
          <Img src={Banner} alt="react-boilerplate - Logo" />
        </A>
        <NavBar>
          <HeaderLink to={ROUTE_PREFIX + ""}>
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to={ROUTE_PREFIX + "features"}>
            <FormattedMessage {...messages.features} />
          </HeaderLink>
          <HeaderLink to={ROUTE_PREFIX + "form"}>
            <FormattedMessage {...messages.form} />
          </HeaderLink>
        </NavBar>
      </div>
    );
  }
}

export default Header;
