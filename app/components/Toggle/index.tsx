/**
 *
 * LocaleToggle
 *
 */
import * as React from "react";
import Select from "./Select";
import ToggleOption from "../ToggleOption";
import {IReactNodeWithPropTypes, ITranslations} from "../../../custom-typings/custom-typings";
import FormEvent = React.FormEvent;

interface IToggle {
  value: string,
  onToggle: (e: FormEvent<Element>) => void,

  messages: ITranslations,
  values: string[],
}

function Toggle(props: IToggle): IReactNodeWithPropTypes<IToggle> {
  const realToggle: any = function (props: IToggle) {
    let content: any = (<option>--</option>);

    // If we have items, render them
    if (props.values) {
      content = props.values.map((value) => (
        <ToggleOption key={value} value={value} message={props.messages[value]}/>
      ));
    }

    return (
      <Select value={props.value} onChange={props.onToggle}>
        {content}
      </Select>
    );
  }
  realToggle.propTypes = {
    onToggle: React.PropTypes.func,
    values: React.PropTypes.array,
    value: React.PropTypes.string,
    messages: React.PropTypes.object,
  };
  return realToggle(props);
}

export default Toggle;
