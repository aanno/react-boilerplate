/**
*
* ToggleOption
*
*/

import * as React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import {IReactNodeWithPropTypes, IToggleOption} from "../../../custom-typings/custom-typings";

const ToggleOption: (IToggleOption) => IReactNodeWithPropTypes<IToggleOption> = ({ value, message, intl }: IToggleOption) => (
  <option value={value}>
    {message ? intl.formatMessage(message) : value}
  </option>
);

ToggleOption.propTypes = {
  value: React.PropTypes.string.isRequired,
  message: React.PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(ToggleOption);
