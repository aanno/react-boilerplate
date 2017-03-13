import styled from 'styled-components';
import {StyledComponentType} from "../../../custom-typings/custom-typings";

type WrapperType = StyledComponentType<HTMLDivElement>;

const Wrapper: WrapperType = styled.div`
  margin: 2em auto;
  width: 40px;
  height: 40px;
  position: relative;
` as WrapperType;

export default Wrapper;
