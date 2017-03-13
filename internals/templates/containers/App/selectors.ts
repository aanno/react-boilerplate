// makeSelectLocationState expects a plain JS object for the routing state
import {MakeSelectType, IStoreState} from "../../../../custom-typings/custom-typings";

const makeSelectLocationState: MakeSelectType<any> = () => {
  let prevRoutingState: any;
  let prevRoutingStateJS: any;

  return (state: IStoreState) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  makeSelectLocationState,
};
