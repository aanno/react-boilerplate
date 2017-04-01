// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';
import {IMyStore, Module} from "../custom-typings/custom-typings";
import {RouteConfig} from "react-router";
import {ROUTE_PREFIX} from "./config/config"

type LazyModuleCb = (_: any, defaultModule: Module) => void;

const errorLoading = (err: Error) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb: LazyModuleCb) => (componentModule: Module) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store: IMyStore): RouteConfig {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: ROUTE_PREFIX + '',
      name: 'home',
      getComponent(_, cb: LazyModuleCb) {
        const importModules = Promise.all([
          System.import('containers/HomePage/reducer'),
          System.import('containers/HomePage/sagas'),
          System.import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: ROUTE_PREFIX + 'features',
      name: 'features',
      getComponent(_, cb: LazyModuleCb) {
        System.import('containers/FeaturePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: ROUTE_PREFIX + 'form',
      name: 'form',
      getComponent(_, cb: LazyModuleCb) {
        System.import('containers/FormPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(_, cb: LazyModuleCb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
