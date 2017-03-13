import styled from 'styled-components';
import {StyledComponentType} from "../../../custom-typings/custom-typings";

type WrapperType = StyledComponentType<HTMLElement>;

const Section: WrapperType = styled.section`
  margin: 3em auto;

  &:first-child {
    margin-top: 0;
  }
` as WrapperType;

export default Section;
