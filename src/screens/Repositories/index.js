import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Routes } from '..';
import {
  Container,
  Loading,
  ErrorState,
  ScreenHeading,
  TabBar,
  TabBarItem,
} from '../../components';
import RepositoryList from './RepositoryList';

class Repositories extends PureComponent {
  renderHeader = () => {
    const query = gql`
      query {
        turkey {
          totalRepositories
        }
      }
    `;

    const { navigator } = this.props;

    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />;
          }

          if (error || !data) {
            return <ErrorState />;
          }

          return (
            <View>
              <ScreenHeading>
                {`Github.ist'de ${data.turkey.totalRepositories} repo bulunuyor.`}
              </ScreenHeading>
              <TabBar>
                <TabBarItem isActive>Star&apos;a Göre</TabBarItem>
                <TabBarItem
                  itemPressed={() => {
                    navigator.push({
                      ...Routes.RepositoriesByForks,
                      backButtonTitle: '',
                    });
                  }}
                >
                  Fork&apos;a Göre
                </TabBarItem>
                <TabBarItem
                  itemPressed={() => {
                    navigator.push({
                      ...Routes.RepositoriesByDate,
                      backButtonTitle: '',
                    });
                  }}
                >
                  İlk Repolar
                </TabBarItem>
              </TabBar>
            </View>
          );
        }}
      </Query>
    );
  };

  render() {
    const { navigator } = this.props;

    return (
      <Container>
        <RepositoryList
          header={this.renderHeader}
          navigator={navigator}
          orderBy={{ field: 'STARS', direction: 'DESC' }}
        />
      </Container>
    );
  }
}

export default Repositories;
