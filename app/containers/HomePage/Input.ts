import styled from 'styled-components';
import {StyledComponentType} from "../../../custom-typings/custom-typings";

type WrapperType = StyledComponentType<HTMLInputElement>;

const Input: WrapperType = styled.input`
  outline: none;
  border-bottom: 1px dotted #999;
` as WrapperType;

export default Input;
