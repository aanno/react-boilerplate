import styled from 'styled-components';
import {StyledComponentType} from "../../../custom-typings/custom-typings";

type WrapperType = StyledComponentType<HTMLSpanElement>;

const AtPrefix: WrapperType = styled.span`
  color: black;
  margin-left: 0.4em;
` as WrapperType;

export default AtPrefix;
