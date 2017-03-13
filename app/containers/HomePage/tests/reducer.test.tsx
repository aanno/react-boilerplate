import {fromJS} from "immutable";
import homeReducer, {IHomePageState} from "../reducer";
import {changeUsername, IChangeUsernameAction} from "../actions";

describe('homeReducer', () => {
  let state: IHomePageState;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {} as IChangeUsernameAction)).toEqual(expectedResult);
  });

  it('should handle the changeUsername action correctly', () => {
    const fixture = 'mxstbr';
    const expectedResult = state.set('username', fixture);

    expect(homeReducer(state, changeUsername(fixture))).toEqual(expectedResult);
  });
});
