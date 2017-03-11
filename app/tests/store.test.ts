/**
 * Test store addons
 */

import { browserHistory } from 'react-router';
import configureStore from '../store';
import {IMyStore} from "../../custom-typings/custom-typings";

describe('configureStore', () => {
  let store: IMyStore;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  describe('asyncReducers', () => {
    it('should contain an object for async reducers', () => {
      expect(typeof store.asyncReducers).toBe('object');
    });
  });

  describe('runSaga', () => {
    it('should contain a hook for `sagaMiddleware.run`', () => {
      expect(typeof store.runSaga).toBe('function');
    });
  });
});
