import styled from 'styled-components';

export interface IProgressBarWrapper {
  hidden: boolean;
}

export default styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  visibility: ${(props: IProgressBarWrapper) => props.hidden ? 'hidden' : 'visible'};
  opacity: ${(props: IProgressBarWrapper) => props.hidden ? '0' : '1'};
  transition: all 500ms ease-in-out;
  z-index: ${(props: IProgressBarWrapper) => props.hidden ? '-10' : '9999'};
`;
