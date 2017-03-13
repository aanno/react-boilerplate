/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedNumber } from 'react-intl';

import { makeSelectCurrentUser } from '../../containers/App/selectors';
import ListItem from '../../components/ListItem';
import IssueIcon from './IssueIcon';
import IssueLink from './IssueLink';
import RepoLink from './RepoLink';
import Wrapper from './Wrapper';

export interface IRepoListItem {
  item: any,
  currentUser: string,
}

export class RepoListItem extends React.PureComponent<IRepoListItem, {}> { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    item: React.PropTypes.object,
    currentUser: React.PropTypes.string,
  };

  render() {
    const item = this.props.item;
    let nameprefix = '';

    // If the repository is owned by a different person than we got the data for
    // it's a fork and we should show the name of the owner
    if (item.owner.login !== this.props.currentUser) {
      nameprefix = `${item.owner.login}/`;
    }

    // Put together the content of the repository
    const content = (
      <Wrapper>
        <RepoLink href={item.html_url} target="_blank">
          {nameprefix + item.name}
        </RepoLink>
        <IssueLink href={`${item.html_url}/issues`} target="_blank">
          <IssueIcon />
          <FormattedNumber value={item.open_issues_count} />
        </IssueLink>
      </Wrapper>
    );

    // Render the content into a list item
    return (
      <ListItem key={`repo-list-item-${item.full_name}`} item={content} />
    );
  }
}

export default connect(createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
}))(RepoListItem);
