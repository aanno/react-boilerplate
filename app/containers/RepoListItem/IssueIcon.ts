import styled from 'styled-components';

import NormalIssueIcon from '../../components/IssueIcon';
import {StyledComponentType, IReactNodeWithPropTypes} from "../../../custom-typings/custom-typings";
import {IIssueIcon} from "../../components/IssueIcon/index";

type WrapperType = StyledComponentType<IReactNodeWithPropTypes<IIssueIcon>>;

const IssueIcon: WrapperType = styled(NormalIssueIcon)`
  fill: #ccc;
  margin-right: 0.25em;
`;

export default IssueIcon;
