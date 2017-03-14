import "babel-polyfill";
// Import all the third party stuff
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as log from "loglevel";
import {Provider} from "react-redux";
import {applyRouterMiddleware, Router, browserHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import * as FontFaceObserver from "fontfaceobserver";
import {useScroll} from "react-router-scroll";
import {AppContainer} from "react-hot-loader";
import "react-hot-loader/patch";
import "sanitize.css/sanitize.css";
// Import root app
import App from "./containers/App/index";
// Import selector for `syncHistoryWithStore`
import {makeSelectLocationState} from "./containers/App/selectors";
// Import Language Provider
import LanguageProvider from "./containers/LanguageProvider";
import "!file-loader?name=[name].[ext]!./favicon.ico";
import "!file-loader?name=[name].[ext]!./manifest.json";
import "file-loader?name=[name].[ext]!./.htaccess";
/* eslint-enable import/no-webpack-loader-syntax */
import configureStore from "./store";
// Import i18n messages
import {translationMessages} from "./i18n";
import "./global-styles";
// Import routes
import createRoutes from "./routes";
import {ITranslations} from "../custom-typings/custom-typings";

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

log.setLevel('debug');

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

// Set up the router, wrapping all Routes in the App component
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

const render = (messages: ITranslations) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <LanguageProvider messages={messages}>
          <Router
            history={history}
            routes={rootRoute}
            render={
              // Scroll to top when going to a new page, imitating default browser
              // behaviour
              applyRouterMiddleware(useScroll())
            }
          />
        </LanguageProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};

// Hot reloadable translation json files
if (module.hot) {
  log.debug('Hot module reloading is true');
  log.debug('module', module, 'module.hot', module.hot);
  (module.hot as any).accept();
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./routes.ts', () => {
    log.debug('Hot module reloading for ./app/routes.ts');
    render(translationMessages);
  });
  module.hot.accept('./i18n.ts', () => {
    log.debug('Hot module reloading for ./i18n');
    render(translationMessages);
  });
  module.hot.accept('./containers/App/index.tsx', () => {
    log.debug('Hot module reloading for ./containers/App/index.tsx');
    rootRoute.component = require('./containers/App/index.tsx');
    render(translationMessages);
  });
  module.hot.accept('./containers/App', () => {
    log.debug('Hot module reloading for ./containers/App');
    rootRoute.component = require('./containers/App/index.tsx');
    render(translationMessages);
  });
  module.hot.accept('./containers/HomePage', () => {
    log.debug('Hot module reloading for ./containers/HomePage');
    rootRoute.component = require('./containers/HomePage/index.tsx');
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(System.import('intl'));
  }))
    .then(() => Promise.all([
      System.import('intl/locale-data/jsonp/en.js'),
      System.import('intl/locale-data/jsonp/de.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
