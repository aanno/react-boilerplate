
import * as StyledComponents from 'styled-components';

export cogit nst injectGlobal: any;

// export const div: any /*HTMLDivElement*/;

type StyledType = <T extends React.Component<P, S>, P, S>(component: T) => React.Component<P, S>;

<T extends React.Component<P, S>, P, S>function styled(component: T): React.Component<P, S>;

declare class StyledClass {
  <T extends React.Component<P, S>, P, S>(component: T): React.Component<P, S>;
  div: any;
}

interface StyledInterface {
  <T extends React.Component<P, S>, P, S>(component: T): React.Component<P, S>;
  div: any;
}

// export default <T extends React.Component<P, S>, P, S>function(component: T): React.Component<P, S>;
export default styled: StyledType;
