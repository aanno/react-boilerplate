/**
*
* ToggleOption
*
*/

import * as React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import {IReactNodeWithPropTypes, IToggleOption} from "../../../custom-typings/custom-typings";

const ToggleOption: (IToggleOption) => IReactNodeWithPropTypes<IToggleOption> = (props: IToggleOption) => {
  const realToggleOption: any = ({value, message, intl}: IToggleOption) => (
    <option value={value}>
      {message ? intl.formatMessage(message) : value}
    </option>
  );
  realToggleOption.propTypes = {
    value: React.PropTypes.string.isRequired,
    message: React.PropTypes.object,
    intl: intlShape.isRequired,
  };
  return realToggleOption(props);
};

export default injectIntl(ToggleOption);
