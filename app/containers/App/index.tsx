/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import * as Helmet from 'react-helmet';
import styled from 'styled-components';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import withProgressBar from '../../components/ProgressBar';
import {IReactNodeWithPropTypes} from "../../../custom-typings/custom-typings";

interface IApp {
  children?: React.ReactNode,
}

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export function App(props: IApp): IReactNodeWithPropTypes<IApp> {
  const realApp: any = function (props: IApp) {
    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
          meta={[
          { name: 'description', content: 'A React.js Boilerplate application' },
        ]}
        />
        <Header />
        {React.Children.toArray(props.children)}
        <Footer />
      </AppWrapper>
    );
  }
  realApp.propTypes = {
    children: React.PropTypes.node,
  };
  return realApp(props);
}

export default withProgressBar(App);
