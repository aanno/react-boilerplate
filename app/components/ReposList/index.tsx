import * as React from 'react';
import { PropTypes } from 'react';

import List from '../../components/List';
import ListItem from '../../components/ListItem';
import LoadingIndicator from '../../components/LoadingIndicator';
import RepoListItem from '../../containers/RepoListItem';
import {IReactNodeWithPropTypes} from "../../../custom-typings/custom-typings";

interface IReposList {
  loading: boolean,
  error: boolean,
  repos: any[],
}

function ReposList(props: IReposList): IReactNodeWithPropTypes<IReposList> {
  const realRepoList: any = function({ loading, error, repos }: IReposList) {
    if (loading) {
      return <List component={LoadingIndicator}/>;
    }

    if (error !== false) {
      const ErrorComponent = () => (
        <ListItem item={'Something went wrong, please try again!'}/>
      );
      return <List component={ErrorComponent}/>;
    }

    if (repos !== false) {
      return <List items={repos} component={RepoListItem}/>;
    }

    return null;
  }
  realReposList.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.any,
    repos: PropTypes.any,
  };
  return realRepoList(props);
}

export default ReposList;
