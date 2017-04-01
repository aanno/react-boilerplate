import * as React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

import A from '../../../components/A';
import messages from '../messages';
import Footer from '../index';

describe('<Footer />', () => {
  it('should render the copyright notice', () => {
    const renderedComponent = shallow(
      <Footer />
    );
    expect(renderedComponent.contains(
      <section>
        <FormattedMessage {...messages.licenseMessage} />
      </section>
    )).toBe(true);
  });

  it('should render the credits', () => {
    const renderedComponent = shallow(<Footer />);
    const elem = <A href="https://twitter.com/mxstbr">Max Stoiber</A>
    const values: any = {
      author: elem,
    }
    expect(renderedComponent.contains(
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={values}
        />
      </section>
    )).toBe(true);
  });
});
