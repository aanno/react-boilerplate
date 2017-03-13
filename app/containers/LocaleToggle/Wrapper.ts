import styled from 'styled-components';
import {StyledComponentType} from "../../../custom-typings/custom-typings";

type WrapperType = StyledComponentType<HTMLDivElement>;

const Wrapper: WrapperType = styled.div`
  padding: 2px;
` as WrapperType;

export default Wrapper;
