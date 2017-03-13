import styled from 'styled-components';

import A from '../../components/A';
import {StyledComponentType} from "../../../custom-typings/custom-typings";

type WrapperType = StyledComponentType<HTMLAnchorElement>;

const IssueLink: WrapperType = styled(A)`
  height: 100%;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
` as WrapperType;

export default IssueLink;
