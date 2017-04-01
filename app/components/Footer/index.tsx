import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import A from '../../components/A';
import LocaleToggle from '../../containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  const elem = <A href="https://twitter.com/mxstbr">Max Stoiber</A>
  const values: any = {
    author: elem,
  }
  return (
    <Wrapper>
      <section>
        <FormattedMessage {...messages.licenseMessage} />
      </section>
      <section>
        <LocaleToggle />
      </section>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={values}
        />
      </section>
    </Wrapper>
  );
}

export default Footer;
