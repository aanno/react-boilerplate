/**
*
* ToggleOption
*
*/

import * as React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import {IReactNodeWithPropTypes, IToggleOption} from "../../../custom-typings/custom-typings";
import InjectedIntlProps = ReactIntl.InjectedIntlProps;

type RealToggleOptionProps = IToggleOption & InjectedIntlProps;

const ToggleOption: (option: IToggleOption) => IReactNodeWithPropTypes<IToggleOption> = (props: IToggleOption) => {
  // TODO (tp): Very strange - seems to be a bug in typescript 2.2.1!
  const realProps: RealToggleOptionProps = props as RealToggleOptionProps;
  const realToggleOption: any = ({value, message, intl}: RealToggleOptionProps) => (
    <option value={value}>
      {message ? (intl ? intl.formatMessage(message) : message) : value}
    </option>
  );
  realToggleOption.propTypes = {
    value: React.PropTypes.string.isRequired,
    message: React.PropTypes.object,
    intl: intlShape.isRequired,
  };
  return realToggleOption(realProps);
};

export default injectIntl(ToggleOption);
