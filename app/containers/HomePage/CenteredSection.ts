import styled from 'styled-components';

import Section from './Section';
import {StyledComponentType} from "../../../custom-typings/custom-typings";

type WrapperType = StyledComponentType<HTMLElement>;

const CenteredSection: WrapperType = styled(Section)`
  text-align: center;
` as WrapperType;

export default CenteredSection;
