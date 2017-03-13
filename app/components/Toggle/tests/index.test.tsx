import * as React from 'react';
import { shallow } from 'enzyme';
import { IntlProvider, defineMessages } from 'react-intl';

import Toggle from '../index';
import {ReactTestProps} from "../../../../custom-typings/custom-typings";
import {IToggle} from "../index";

describe('<Toggle />', () => {
  it('should contain default text', () => {
    const defaultEnMessage = 'someContent';
    const defaultDeMessage = 'someOtherContent';
    const messages = defineMessages({
      en: {
        id: 'boilerplate.containers.LocaleToggle.en',
        defaultMessage: defaultEnMessage,
      },
      de: {
        id: 'boilerplate.containers.LocaleToggle.en',
        defaultMessage: defaultDeMessage,
      },
    });
    const props: ReactTestProps<IToggle> = {};
    const renderedComponent = shallow(
      <IntlProvider locale="en">
        <Toggle {...props} values={['en', 'de']} messages={messages} />
      </IntlProvider>
    );
    expect(renderedComponent.contains(<Toggle {...props} values={['en', 'de']} messages={messages} />)).toBe(true);
  });
});
