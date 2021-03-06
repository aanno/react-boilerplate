import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { IntlProvider } from 'react-intl';

import RepoListItem from '../../../containers/RepoListItem';
import List from '../../../components/List';
import LoadingIndicator from '../../../components/LoadingIndicator';
import ReposList from '../index';
import {ReactTestProps, IRepo} from "../../../../custom-typings/custom-typings";
import {IReposList} from "../index";

describe('<ReposList />', () => {
  it('should render the loading indicator when its loading', () => {
    const props: ReactTestProps<IReposList> = {};
    const renderedComponent = shallow(
      <ReposList {...props} loading />
    );
    expect(renderedComponent.contains(<List component={LoadingIndicator} />)).toEqual(true);
  });

  it('should render an error if loading failed', () => {
    const props: ReactTestProps<IReposList> = {};
    const renderedComponent = mount(
      <IntlProvider locale="en">
        <ReposList
          {...props}
          loading={false}
          error={{ name: 'Error', message: 'Loading failed!' }}
        />
      </IntlProvider>
    );
    expect(renderedComponent.text()).toMatch(/Something went wrong/);
  });

  it('should render the repositories if loading was successful', () => {
    const repos: IRepo[] = [{
      owner: {
        login: 'mxstbr',
      },
      html_url: 'https://github.com/react-boilerplate/react-boilerplate',
      name: 'react-boilerplate',
      open_issues_count: 20,
      full_name: 'react-boilerplate/react-boilerplate',
    }];
    const props: ReactTestProps<IReposList> = {};
    const renderedComponent = shallow(
      <ReposList
        {...props}
        repos={repos}
        error={undefined}
      />
    );

    expect(renderedComponent.contains(<List items={repos} component={RepoListItem} />)).toEqual(true);
  });

  it('should not render anything if nothing interesting is provided', () => {
    const renderedComponent = shallow(
      <ReposList
        repos={[]}
        error={undefined}
        loading={false}
      />
    );

    expect(renderedComponent.html()).toEqual(null);
  });
});
