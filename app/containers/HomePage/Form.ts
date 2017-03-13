import styled from 'styled-components';
import {StyledComponentType} from "../../../custom-typings/custom-typings";

type WrapperType = StyledComponentType<HTMLFormElement>;

const Form: WrapperType = styled.form`
  margin-bottom: 1em;
` as WrapperType;

export default Form;
